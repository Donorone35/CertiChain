import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload as UploadIcon, Database, Hash } from 'lucide-react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { ExtractedData } from '../types/certificate'; // ✅ shared type

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [hash, setHash] = useState<string>('');
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'storing' | 'stored'>('idle');
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null);
    setHash('');
    setTransactionHash('');
    setStatus('idle');
  };

  const handleIssue = async () => {
    if (!selectedFile) return;

    setStatus('storing');

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://localhost:8000/issue", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.error) {
        setStatus('idle');
        return;
      }

      const parsed = result.data;

      const mappedData: ExtractedData = {
        studentName: parsed.student_name || "N/A",
        semester: parsed.semester || "N/A",
        sgpa: parsed.sgpa?.toString() || "N/A",
        cgpa: parsed.cgpa?.toString() || "N/A",
        rollNumber: parsed.roll_number || "N/A",
        issueDate: parsed.year_of_admission || "N/A",
      };

      setExtractedData(mappedData);
      setHash(result.hash);

      if (result.tx && result.tx.tx_hash) {
        setTransactionHash(result.tx.tx_hash);
      }

      setStatus('stored');

    } catch (err) {
      console.error("Issue error:", err);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ FIXED: removed props */}
      <Navbar />

      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('upload')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Database className="h-5 w-5" />
                <span>History</span>
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'upload' && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Issue Certificate
                </h1>
                <p className="text-gray-600">
                  Upload and store certificates on the blockchain
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <UploadIcon className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        Upload Certificate
                      </h2>
                    </div>

                    <FileUpload onFileSelect={handleFileSelect} />

                    {selectedFile && status === 'idle' && (
                      <button
                        onClick={handleIssue}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Issue Certificate
                      </button>
                    )}
                  </div>

                  {status === 'storing' && (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                      <LoadingSpinner />
                      <p className="mt-4 text-gray-600 font-medium">
                        Processing and storing on blockchain...
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                  {extractedData && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Extracted Data
                      </h2>

                      <div className="space-y-4">
                        {Object.entries(extractedData).map(([key, value]) => (
                          <div key={key} className="border-l-4 border-blue-500 pl-4">
                            <p className="text-xs font-medium text-gray-500 uppercase">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hash && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Hash className="h-6 w-6 text-gray-700" />
                        <h2 className="text-xl font-bold text-gray-900">
                          Document Hash
                        </h2>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs font-mono text-gray-900 break-all">
                          {hash}
                        </p>
                      </div>

                      {status === 'stored' && (
                        <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-4">
                          <p className="font-bold text-green-700 mb-2">
                            ✅ Certificate Stored on Blockchain
                          </p>

                          {transactionHash && (
                            <div className="bg-white p-3 rounded">
                              <p className="text-xs font-medium text-gray-500 mb-1">
                                Transaction Hash
                              </p>
                              <p className="text-xs font-mono text-gray-900 break-all">
                                {transactionHash}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Certificate History
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-gray-600 text-center py-8">
                  No certificates issued yet.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}