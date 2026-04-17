import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Phone,
  Star,
  FileDown,
  BoxSelectIcon,
  Search,
  Bell,
  User,
  ChevronRight,
  CheckCircle,
  Sparkles,
  Menu,
  X
} from "lucide-react";

import {
  createSeekerProfile,
  updateSeekerProfile,
  getSeekerProfile,
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead
} from "../../../Apiroute";


function SeekerDashboard() {

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);


  // ================= PROFILE STATES =================

  const [location, setLocation] =
    useState("");

  const [stateName, setStateName] =
    useState("");

  const [college, setCollege] =
    useState("");

  const [branch, setBranch] =
    useState("");

  const [isUpdateMode, setIsUpdateMode] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [saveSuccess, setSaveSuccess] =
    useState(false);


  // ================= NOTIFICATIONS =================

  const [notifications, setNotifications] =
    useState([]);

  const [openNotification, setOpenNotification] =
    useState(false);


  const unreadCount =
    notifications.filter(
      n => !n.is_read
    ).length;


  // ================= FETCH PROFILE =================

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res =
          await getSeekerProfile();

        setLocation(res.data.location);

        setStateName(res.data.state);

        setCollege(res.data.college);

        setBranch(res.data.branch);

        setIsUpdateMode(true);

      } catch {

        setIsUpdateMode(false);

      }

    };

    fetchProfile();

  }, []);


  // ================= FETCH NOTIFICATIONS =================

  useEffect(() => {

    const fetchNotifications =
      async () => {

        try {

          const res =
            await getMyNotifications();

          setNotifications(
            res.data || []
          );

        } catch {

          console.log(
            "Notifications load failed"
          );

        }

      };

    fetchNotifications();

  }, []);


  // ================= MARK SINGLE READ =================

  const markAsRead = async (id) => {

    try {

      await markNotificationRead(id);

      setNotifications(prev =>
        prev.map(n =>
          n.id === id
            ? { ...n, is_read: true }
            : n
        )
      );

    } catch {

      console.log("Read failed");

    }

  };


  // ================= MARK ALL READ =================

  const markAllAsRead = async () => {

    try {

      await markAllNotificationsRead();

      setNotifications(prev =>
        prev.map(n => ({
          ...n,
          is_read: true
        }))
      );

    } catch {

      console.log("Mark all failed");

    }

  };


  // ================= SAVE PROFILE =================

  const handleSaveDetails = async () => {

    if (
      !location ||
      !stateName ||
      !college ||
      !branch
    ) {

      alert("Fill all fields ❌");

      return;

    }

    try {

      setIsSaving(true);

      const formData =
        new FormData();

      formData.append(
        "location",
        location
      );

      formData.append(
        "state",
        stateName
      );

      formData.append(
        "college",
        college
      );

      formData.append(
        "branch",
        branch
      );


      if (isUpdateMode) {

        await updateSeekerProfile(
          formData
        );

      } else {

        await createSeekerProfile(
          formData
        );

      }

      setSaveSuccess(true);

    } catch (error) {

      console.log(error);

      alert("Save failed ❌");

    } finally {

      setIsSaving(false);

    }

  };


  // ================= MENU =================

  const menuItems = [

    {
      title: "Guide List",
      path: "/guides"
    },

    {
      title: "My Bookings",
      path: "/my-bookings"
    },

    

  

    {
      title: "Submit Rating",
      path: "/rating"
    },

    {
      title: "Download Report",
      path: "/report"
    }

  ];


  return (

    <div className="min-h-screen bg-gray-100 p-6">


      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">

          Seeker Dashboard

        </h1>


        <div className="relative">

          <button
            onClick={() =>
              setOpenNotification(
                !openNotification
              )
            }
          >

            <Bell size={26} />

            {unreadCount > 0 && (

              <span className="text-xs text-white bg-red-500 px-2 rounded-full ml-1">

                {unreadCount}

              </span>

            )}

          </button>


          {openNotification && (

            <div className="absolute right-0 bg-white shadow p-4 w-72">

              <h3 className="font-semibold mb-2">

                Notifications

              </h3>


              {notifications.map(note => (

                <div
                  key={note.id}
                  onClick={() =>
                    markAsRead(note.id)
                  }
                  className="border-b py-2 cursor-pointer"
                >

                  <p className="font-medium">

                    {note.title}

                  </p>

                  <p className="text-sm text-gray-500">

                    {note.message}

                  </p>

                </div>

              ))}


              {notifications.length > 0 && (

                <button
                  onClick={markAllAsRead}
                  className="text-orange-500 text-sm mt-2"
                >

                  Mark all as read

                </button>

              )}

            </div>

          )}

        </div>

      </div>


      {/* PROFILE FORM */}

      <div className="bg-white p-6 rounded shadow mb-6">

        <h2 className="text-lg font-semibold mb-4">

          Profile Details

        </h2>


        <input
          placeholder="Country"
          value={location}
          onChange={e =>
            setLocation(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />


        <input
          placeholder="State"
          value={stateName}
          onChange={e =>
            setStateName(
              e.target.value
            )
          }
          className="border p-2 w-full mb-3"
        />


        <input
          placeholder="College"
          value={college}
          onChange={e =>
            setCollege(
              e.target.value
            )
          }
          className="border p-2 w-full mb-3"
        />


        <input
          placeholder="Branch"
          value={branch}
          onChange={e =>
            setBranch(
              e.target.value
            )
          }
          className="border p-2 w-full mb-3"
        />


        <button
          onClick={handleSaveDetails}
          disabled={isSaving}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >

          {isSaving
            ? "Saving..."
            : "Save Details"}

        </button>

      </div>


      {/* MENU */}

      <div className="grid grid-cols-2 gap-4">

        {menuItems.map(
          (item, index) => (

            <button
              key={index}
              onClick={() =>
                navigate(item.path)
              }
              className="bg-white shadow p-4 rounded"
            >

              {item.title}

            </button>

          )
        )}

      </div>

    </div>

  );

}

export default SeekerDashboard;