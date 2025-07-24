const express = require('express');
const router = express.Router();
const axios = require('axios');
const Property = require('../models/propertyModel');
const Blog = require('../models/blogModel');
const ServiceProvider = require('../models/serviceProviderModel');
require('dotenv').config();

// Helper: Retrieve context from DB based on user message
async function getContextForMessage(message) {
  let context = "";

  // Simple keyword-based intent detection
  if (/property|house|apartment|plot|commercial/i.test(message)) {
    const properties = await Property.find().sort({ createdAt: -1 }).limit(3);
    context += "\n### 🏠 Latest Properties:\n";
    properties.forEach((p, i) => {
      const url = `/property/${p._id}`;
      const features = p.features && p.features.length > 0 ? p.features.join(', ') : 'N/A';
      const amenities = p.amenities && p.amenities.length > 0 ? p.amenities.join(', ') : 'N/A';
      const contact = p.contactInfo ? `Phone: ${p.contactInfo.phone || 'N/A'}, Email: ${p.contactInfo.email || 'N/A'}` : '';
      const image = p.images && p.images.length > 0 ? p.images[0] : null;
      context += `${image ? `![${p.name}](${image})\n` : ''}**${p.name}**\n- **Price:** PKR ${p.price}\n- **Location:** ${p.city}, ${p.province}\n- **Address:** ${p.address}\n- **Features:** ${features}\n- **Amenities:** ${amenities}\n- **Contact:** ${contact}\n- [View Listing](${url})\n\n`;
    });
  }
  if (/blog|news|article/i.test(message)) {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    context += "\n### 📝 Latest Blogs:\n";
    blogs.forEach((b, i) => {
      // Prefer slug if available, fallback to id
      const url = b.slug ? `/blogs/${b.slug}` : `/blogs/${b._id}`;
      const desc = b.description ? b.description.substring(0, 120) + (b.description.length > 120 ? '...' : '') : '';
      context += `**${b.title}**\n${desc}\n- [Read Blog](${url})\n\n`;
    });
  }
  if (/service|provider|renovation|repair/i.test(message)) {
    const services = await ServiceProvider.find().sort({ createdAt: -1 }).limit(3);
    context += "\n### 🛠️ Top Service Providers:\n";
    services.forEach((s, i) => {
      const name = s.businessName || 'Unnamed';
      const specialization = (s.servicesOffered && s.servicesOffered.length > 0)
        ? s.servicesOffered.join(', ')
        : 'General';
      const url = `/providers/${s._id}`;
      const rating = s.averageRating ? `${s.averageRating.toFixed(1)} / 5` : 'No ratings yet';
      const address = s.address || 'N/A';
      const location = s.location && s.location.lat && s.location.lng ? `Lat: ${s.location.lat}, Lng: ${s.location.lng}` : '';
      const image = s.image ? s.image : null;
      context += `${image ? `![${name}](${image})\n` : ''}**${name}**\n- **Services:** ${specialization}\n- **Rating:** ${rating}\n- **Address:** ${address}\n${location ? `- **Location:** ${location}\n` : ''}- [View Provider](${url})\n\n`;
    });
  }
  return context;
}

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const lowerMsg = message.toLowerCase();

  // Custom intent: What is GharBaar Estate?
  if (/what( is|'s)? gharbaar( estate)?(\?|$)/i.test(lowerMsg)) {
    return res.json({
      reply: `
### 🏠 What is **GharBaar Estate**?

**GharBaar Estate** is a modern real estate platform for buying and selling houses in Pakistan, uniquely offering:
- **Property Listings:** Buy and sell homes, plots, and commercial properties.
- **Renovation Services:** Get expert renovation suggestions and connect with trusted service providers.
- **AI Features:**
  - For **buyers**: Use natural language prompts to describe your dream house (e.g., "5 marla, 4 rooms, DHA Lahore, under 2 crore") and instantly see matching listings—no need for manual filters!
  - For **sellers**: Upload house images and our AI will analyze them to suggest if renovation is needed. If so, you'll get a list of top-rated, nearby renovation professionals.

GharBaar Estate goes beyond traditional platforms like Zameen.com by integrating renovation and AI-powered features for a seamless property experience.
      `.trim()
    });
  }

  // Custom intent: What services does GharBaar Estate offer?
  if (/what( services| can| does)? (gharbaar( estate)? )?(offer|provide)/i.test(lowerMsg)) {
    return res.json({
      reply: `
### 🛠️ **Services Offered by GharBaar Estate**

- **Buy & Sell Properties:** Houses, plots, and commercial listings.
- **AI-Powered Search:** Describe your ideal property in a prompt and get instant matches.
- **Renovation Suggestions:** Upload property images and get AI-driven renovation advice.
- **Connect with Service Providers:** Find trusted, rated professionals for renovation and home services.
- **Smart Recommendations:** Personalized property and service suggestions based on your needs.
      `.trim()
    });
  }

  // Custom intent: How to get renovation suggestion
  if (/renovation suggestion|how.*renovation|get.*renovation/i.test(lowerMsg)) {
    return res.json({
      reply: `
### 🏗️ **How to Get a Renovation Suggestion**

1. Go to the [Add Property](/add-property) page.
2. Fill in your property details and upload clear images of your house.
3. After submitting, our AI will analyze your images and instantly tell you if renovation is needed.
4. If renovation is recommended, you'll see estimated costs and a list of top-rated, nearby professionals to help you.

*This feature makes it easy to get expert renovation advice and connect with trusted service providers—all in one place!*
      `.trim()
    });
  }

  try {
    // 1. Get context from your data
    const context = await getContextForMessage(message);
    // console.log('Chatbot context:', context)

    // 2. Compose system prompt with strict instructions
    const systemPrompt = `
You are GharBaar Estate, a smart real estate assistant for buyers and sellers in Pakistan.
ONLY use the following website data to answer user questions. If the answer is not in the data, reply: "Sorry, I couldn't find that information in our listings."
Do NOT use your own knowledge or make up information.
If you mention a property, service provider, or blog, include the provided markdown links so the user can click to see more details.
Use markdown for bolding important words, headings, and to provide clear, well-structured, and user-friendly answers. Use headings for sections, bullet points for details, and bold for key info. Use markdown images for properties and providers if image URLs are provided. Use emojis for section headings for a more engaging response.

Website Data:
${context}

Answer briefly, professionally, and always in context of Pakistani real estate (e.g. locations like DHA Lahore, Bahria Town, prices in PKR). Only give relevant and to-the-point answers.
    `.trim();

    // 3. Call LLM (Mixtral via Together API)
    const response = await axios.post('https://api.together.xyz/v1/chat/completions', {
      model: "mistralai/Mixtral-8x7b-Instruct-v0.1",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
      top_p: 0.9
    }, {
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    // --- For Ollama (local) ---
    // const response = await axios.post('http://localhost:11434/api/chat', {
    //   model: "mixtral",
    //   messages: [
    //     { role: "system", content: systemPrompt },
    //     { role: "user", content: message }
    //   ]
    // });

    const reply = response.data.choices
      ? response.data.choices[0].message.content
      : response.data.message.content; // Ollama

    res.json({ reply });

  } catch (err) {
    console.error("Chatbot Error:", err.message);
    res.status(500).json({ error: "AI failed to respond. Try again later." });
  }
});

module.exports = router;