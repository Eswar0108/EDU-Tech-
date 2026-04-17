import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Camera,
  CheckCircle,
  Edit2,
  Save,
  X,
  Star,
  Users,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Award,
} from "lucide-react";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // User Data State
  const [userData, setUserData] = useState({
    unique_id: "",
  
   
    college: "",
    branch: "",
    graduationYear: "",
    bio: "",
    profileImage: "",
    role: "guide",
    joinDate: "",
    totalSessions: 0,
    rating: 0,
    location: "",
    expertise: [],
  });

  // Editable form state
  const [formData, setFormData] = useState({ ...userData });

  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch user data
  const fetchUserData = () => {
    setTimeout(() => {
      const storedUser = localStorage.getItem("userData");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setFormData(user);
      } else {
        // Demo data
        const demoUser = {
          unique_id: "GUIDE2026",
          email: "guide@example.com",
          phone: "+91 9876543210",
          college: "IIT Bombay",
          branch: "Computer Science",
          graduationYear: "2026",
          bio: "Passionate about helping students navigate their academic journey. Specializing in college admissions and career guidance.",
          profileImage: "",
          role: "guide",
          joinDate: "2024-01-15",
          totalSessions: 25,
          rating: 4.8,
          location: "Mumbai, India",
          expertise: ["College Admissions", "Career Counseling", "Exam Preparation"],
        };

        setUserData(demoUser);
        setFormData(demoUser);
      }

      setIsLoading(false);
    }, 800);
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile
  const handleSave = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("userData", JSON.stringify(formData));
      setUserData(formData);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Profile update failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  // Profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-10 px-4">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle size={18} />
          <span>Profile updated successfully</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600"></div>

          {/* Profile Section */}
          <div className="relative px-6 pb-6">
            {/* Profile Image */}
            <div className="absolute -top-12 left-6">
              <div className="relative inline-block">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                    {userData.unique_id?.charAt(0) || "G"}
                  </div>
                )}

                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-orange-500 p-1.5 rounded-full cursor-pointer shadow-md hover:bg-orange-600 transition">
                    <Camera size={14} color="white" />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end pt-2">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              )}
            </div>

            {/* User Info */}
            <div className="mt-12 text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.unique_id}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full capitalize">
                  {userData.role}
                </span>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">
                    {userData.rating} · {userData.totalSessions} sessions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Joined {new Date(userData.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="border-t border-gray-100 px-6 py-6">
            <div className="grid md:grid-cols-2 gap-6">
         

              {/* College */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="college"
                    value={formData.college}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl transition ${
                      isEditing
                        ? "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  />
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="branch"
                    value={formData.branch}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl transition ${
                      isEditing
                        ? "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  />
                </div>
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Year
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="graduationYear"
                    value={formData.graduationYear}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-xl transition ${
                      isEditing
                        ? "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                  />
                </div>
              </div>

           
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                disabled={!isEditing}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2.5 border rounded-xl transition ${
                  isEditing
                    ? "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Expertise */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Expertise
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.expertise?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {isEditing && (
                  <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 text-sm rounded-full hover:border-orange-400 hover:text-orange-500 transition">
                    + Add
                  </button>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition shadow-md hover:shadow-lg"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition shadow-md hover:shadow-lg"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            Activity Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{userData.totalSessions}</p>
              <p className="text-xs text-gray-500">Total Sessions</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{userData.rating}</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">98%</p>
              <p className="text-xs text-gray-500">Response Rate</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">Top 10%</p>
              <p className="text-xs text-gray-500">Rank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;