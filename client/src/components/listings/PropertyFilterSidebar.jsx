import React, { useState } from "react";
import { FaFilter, FaCheck, FaTimes, FaHome, FaBuilding, FaMapMarkerAlt, FaBed, FaBath, FaCouch, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AREA_OPTIONS = ["3 marla", "5 marla", "7 marla", "10 marla", "1 kanal", "2 kanal", "1200 sqft"];
const PROPERTY_TYPES = ["House", "Apartment", "Plot", "Commercial"];
const CITIES = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Multan", "Other"];
const FEATURES = ["Garage", "Balcony", "Garden", "Pool", "Basement", "Terrace", "Lift"];
const AMENITIES = ["Gas", "Electricity", "Water Supply", "Sewerage", "Internet", "Parking"];

const PropertyFilterSidebar = ({
  filters,
  setFilters,
  onApply,
  onClear,
  isOpen,
  setIsOpen,
  scrollable,
  mobileFullHeight,
}) => {
  const [local, setLocal] = useState(filters || {});
  React.useEffect(() => { setLocal(filters || {}); }, [filters]);

  const handleChange = (field, value) => setLocal((prev) => ({ ...prev, [field]: value }));
  const handleRoomsChange = (room, value) => setLocal((prev) => ({ ...prev, rooms: { ...prev.rooms, [room]: value } }));
  const handleMultiSelect = (field, value) => setLocal((prev) => {
    const arr = prev[field] || [];
    return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
  });
  const handleCheckbox = (field) => setLocal((prev) => ({ ...prev, [field]: !prev[field] }));
  const handleApply = () => { setFilters(local); if (onApply) onApply(local); if (setIsOpen) setIsOpen(false); };
  const handleClear = () => { setLocal({}); setFilters({}); if (onClear) onClear(); if (setIsOpen) setIsOpen(false); };
  // Responsive sidebar classes
  const sidebarClass =
    (mobileFullHeight
      ? `fixed z-50 top-0 left-0 h-full max-h-screen w-80 bg-white dark:bg-gray-950 shadow-2xl border-r border-indigo-100 dark:border-gray-800 transform transition-transform duration-300${isOpen ? ' translate-x-0' : ' -translate-x-full'} md:static md:translate-x-0 md:shadow-none md:border-none md:w-72 md:rounded-2xl md:sticky md:top-24` 
      : "fixed z-40 top-0 left-0 h-full w-80 bg-white dark:bg-gray-950 shadow-2xl border-r border-indigo-100 dark:border-gray-800 transform transition-transform duration-300" +
        (isOpen ? " translate-x-0" : " -translate-x-full") +
        " md:static md:translate-x-0 md:shadow-none md:border-none md:w-72 md:rounded-2xl md:sticky md:top-24"
    );
  if (mobileFullHeight && !isOpen) return null;

  return (
    <aside className={sidebarClass} style={{ minHeight: "70vh" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-100 dark:border-gray-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 md:rounded-t-2xl">
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-200 font-bold text-lg">
          <FaFilter /> Filters
        </div>
        <button className="md:hidden text-gray-500 hover:text-red-500 transition" onClick={() => setIsOpen(false)}><FaTimes size={20} /></button>
      </div>
      <div className={scrollable ? "overflow-y-auto max-h-screen px-6 py-4 space-y-7" : "px-6 py-4 space-y-7"}>
        {/* Property Type & City */}
        <div className="grid grid-cols-1 gap-4">
          <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200 flex items-center gap-2"><FaHome /> Property Type</label>
          <select className="w-full border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900" value={local.propertyType || ""} onChange={e => handleChange("propertyType", e.target.value)}>
            <option value="">Any</option>
            {PROPERTY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200 flex items-center gap-2 mt-4"><FaMapMarkerAlt /> City</label>
          <select className="w-full border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900" value={local.city || ""} onChange={e => handleChange("city", e.target.value)}>
            <option value="">Any</option>
            {CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>
        {/* Area & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200">Area</label>
            <select className="w-full border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900" value={local.area || ""} onChange={e => handleChange("area", e.target.value)}>
              <option value="">Any</option>
              {AREA_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200 flex items-center gap-1"><FaMoneyBillWave /> Price (PKR)</label>
            <div className="flex gap-2">
              <input type="number" className="w-1/2 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Min" value={local.priceMin || ""} onChange={e => handleChange("priceMin", e.target.value)} min={0} />
              <input type="number" className="w-1/2 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Max" value={local.priceMax || ""} onChange={e => handleChange("priceMax", e.target.value)} min={0} />
            </div>
          </div>
        </div>
        {/* Year Built, Furnished, Negotiable */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200 flex items-center gap-1"><FaCalendarAlt /> Year Built</label>
            <div className="flex gap-2">
              <input type="number" className="w-1/2 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Min" value={local.yearBuiltMin || ""} onChange={e => handleChange("yearBuiltMin", e.target.value)} min={1800} />
              <input type="number" className="w-1/2 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Max" value={local.yearBuiltMax || ""} onChange={e => handleChange("yearBuiltMax", e.target.value)} min={1800} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!local.furnished} onChange={() => handleCheckbox("furnished")}/>
              <FaCouch /> Furnished
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!local.negotiable} onChange={() => handleCheckbox("negotiable")}/>
              <FaCheckCircle /> Negotiable
            </label>
          </div>
        </div>
        {/* Rooms */}
        <div>
          <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200 flex items-center gap-2"><FaBed /> Rooms</label>
          <div className="flex gap-2">
            <input type="number" className="w-1/4 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Beds" value={local.rooms?.beds || ""} onChange={e => handleRoomsChange("beds", e.target.value)} min={0} />
            <input type="number" className="w-1/4 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Baths" value={local.rooms?.baths || ""} onChange={e => handleRoomsChange("baths", e.target.value)} min={0} />
            <input type="number" className="w-1/4 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Kitchens" value={local.rooms?.kitchens || ""} onChange={e => handleRoomsChange("kitchens", e.target.value)} min={0} />
            <input type="number" className="w-1/4 border-2 border-indigo-200 dark:border-gray-700 rounded-lg px-2 py-2 bg-white dark:bg-gray-900" placeholder="Living" value={local.rooms?.living || ""} onChange={e => handleRoomsChange("living", e.target.value)} min={0} />
          </div>
        </div>
        {/* Features */}
        <div>
          <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200">Features</label>
          <div className="flex flex-wrap gap-2">
            {FEATURES.map((feature) => (
              <button key={feature} type="button" className={`px-3 py-1 rounded-full border-2 text-xs font-semibold transition-all duration-200 ${local.features?.includes(feature) ? "bg-indigo-100 border-indigo-500 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200" : "bg-white border-indigo-200 text-gray-700 dark:bg-gray-900 dark:text-gray-200"}`} onClick={() => handleMultiSelect("features", feature)}>{feature}</button>
            ))}
          </div>
        </div>
        {/* Amenities */}
        <div>
          <label className="block font-semibold mb-1 text-indigo-700 dark:text-indigo-200">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => (
              <button key={amenity} type="button" className={`px-3 py-1 rounded-full border-2 text-xs font-semibold transition-all duration-200 ${local.amenities?.includes(amenity) ? "bg-purple-100 border-purple-500 text-purple-700 dark:bg-purple-900 dark:text-purple-200" : "bg-white border-purple-200 text-gray-700 dark:bg-gray-900 dark:text-gray-200"}`} onClick={() => handleMultiSelect("amenities", amenity)}>{amenity}</button>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex gap-4 px-6 py-4 border-t border-indigo-100 dark:border-gray-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 md:rounded-b-2xl">
        <button className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow transition" onClick={handleApply}><FaCheck className="inline mr-1" /> Apply</button>
        <button className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold shadow transition" onClick={handleClear}><FaTimes className="inline mr-1" /> Clear</button>
      </div>
    </aside>
  );
};

export default PropertyFilterSidebar; 