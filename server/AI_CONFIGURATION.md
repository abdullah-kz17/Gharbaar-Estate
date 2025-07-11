# AI Flask Server Configuration Guide

## Overview
The AI functionality requires a Flask server running the machine learning model. This guide explains how to configure the Flask server URL for different environments.

## Environment Variables

### For Development (Local Machine)

Create a `.env` file in the `server` directory with:

```env
# For local development - Flask server running on same machine
LOCAL_FLASK_URL=http://localhost:5001

# Or if Flask server is on different machine in your network
LOCAL_FLASK_URL=http://192.168.1.100:5001
```

### For Production

Set the `FLASK_SERVER_URL` environment variable:

```env
# Production Flask server URL
FLASK_SERVER_URL=https://your-flask-server-domain.com
# or
FLASK_SERVER_URL=https://your-flask-server-ip:5001
```

## Configuration Priority

1. **Production**: `FLASK_SERVER_URL` (required for production)
2. **Development**: `LOCAL_FLASK_URL` (optional, defaults to `http://localhost:5001`)
3. **Fallback**: `http://localhost:5001` (development only)

## Setup Instructions

### 1. Local Development Setup

1. Start your Flask AI server:
   ```bash
   cd ai
   python predict.py
   ```

2. Create `.env` file in `server` directory:
   ```env
   LOCAL_FLASK_URL=http://localhost:5001
   ```

3. Start your Node.js server:
   ```bash
   cd server
   npm start
   ```

### 2. Network Development Setup

If your Flask server is on a different machine:

1. Find your Flask server's IP address
2. Set in `.env`:
   ```env
   LOCAL_FLASK_URL=http://192.168.1.100:5001
   ```

### 3. Production Deployment

1. Deploy your Flask server to a cloud service (Heroku, AWS, etc.)
2. Set environment variable:
   ```env
   FLASK_SERVER_URL=https://your-flask-server-domain.com
   ```

## Error Handling

The system now includes better error handling:

- **Connection Refused**: Flask server is not running
- **Timeout**: Flask server is taking too long to respond
- **General Errors**: Other issues with the AI service

## Testing

To test the configuration:

1. Make sure your Flask server is running
2. Try uploading an image through the property form
3. Check the server logs for the Flask server URL being used

## Troubleshooting

### Common Issues

1. **"AI service is currently unavailable"**
   - Check if Flask server is running
   - Verify the URL in your `.env` file
   - Check firewall settings

2. **"Request timeout"**
   - Flask server might be overloaded
   - Check if the model is loading properly
   - Increase timeout if needed

3. **"FLASK_SERVER_URL environment variable is required for production"**
   - Set the `FLASK_SERVER_URL` environment variable in production
   - Don't use localhost URLs in production

### Debug Mode

To see which URL is being used, check the server logs:
```
🤖 Sending request to Flask server: http://localhost:5001/predict
``` 