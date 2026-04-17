import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FileDown, Download, ArrowLeft } from "lucide-react";

import {
  getReportStatus,
  generateReport,
  downloadReport
} from "../../../Apiroute";

function DownloadReport() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [reportReady, setReportReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);


  // ✅ auto-generate report if feedback exists
  useEffect(() => {

    const checkAndGenerate = async () => {

      try {

        // first check existing status
        const statusRes = await getReportStatus(bookingId);

        if (statusRes.data.generated) {

          setReportReady(true);

        } else {

          // try generating report
          await generateReport(bookingId);

          // re-check status
          const retryStatus = await getReportStatus(bookingId);

          setReportReady(retryStatus.data.generated);

        }

      } catch (error) {

        console.log(
          "Report not ready yet:",
          error.response?.data || error
        );

        setReportReady(false);

      } finally {

        setChecking(false);

      }

    };

    if (bookingId) checkAndGenerate();

  }, [bookingId]);


  // ✅ download handler
  const handleDownload = async () => {

    try {

      setIsDownloading(true);

      const res = await downloadReport(bookingId);

      const blob = new Blob(
        [res.data],
        { type: "application/pdf" }
      );

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `session-report-${bookingId}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

      alert("Report downloaded successfully 📄");

      navigate("/seeker");

    } catch (error) {

      console.error(
        "Download failed:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.detail ||
        "Report not ready yet ❌"
      );

    } finally {

      setIsDownloading(false);

    }

  };


  if (checking) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Preparing your report...
      </div>
    );

  }


  return (

    <div className="min-h-screen bg-[#fffbed] flex flex-col items-center justify-center px-6">

      {/* Back button */}
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-orange-500"
      >
        <ArrowLeft size={20} />
        Back
      </motion.button>


      {/* Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full"
      >

        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-orange-500">
            <FileDown className="text-white" size={30} />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">
          Download Session Report
        </h2>


        {reportReady ? (

          <>
            <p className="text-gray-500 mb-6">
              Your personalized guidance report is ready.
            </p>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl w-full flex items-center justify-center gap-2"
            >

              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download Report
                </>
              )}

            </button>
          </>

        ) : (

          <p className="text-gray-500">
            Waiting for seeker rating or booking completion.
            <br />
            Report will generate automatically after that.
          </p>

        )}

      </motion.div>

    </div>

  );

}

export default DownloadReport;