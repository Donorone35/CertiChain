import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload as UploadIcon, Database, Hash } from 'lucide-react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';

interface ExtractedData {
  studentName: string;
  semester: string;
  sgpa: string;
  cgpa: string;
  rollNumber: string;
  issueDate: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [hash, setHash] = useState<string>('');
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'extracting' | 'extracted' | 'storing' | 'stored'>('idle');
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

  const handleExtract = async () => {
    if (!selectedFile) return;

    setStatus('extracting');

    setTimeout(() => {
      const mockData: ExtractedData = {
        studentName: 'John Doe',
        semester: '6th Semester',
        sgpa: '8.5',
        cgpa: '8.2',
        rollNumber: 'CS2021001',
        issueDate: '2024-05-15',
      };

      const mockHash = '0x' + Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      setExtractedData(mockData);
      setHash(mockHash);
      setStatus('extracted');
    }, 2000);
  };

  const handleStoreOnBlockchain = async () => {
    setStatus('storing');

    setTimeout(() => {
      const mockTxHash = '0x' + Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      setTransactionHash(mockTxHash);
      setStatus('stored');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} userType="admin" />

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
                  Upload, extract, and store certificates on the blockchain
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <UploadIcon className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">Upload Certificate</h2>
                    </div>
                    <FileUpload onFileSelect={handleFileSelect} />

                    {selectedFile && status === 'idle' && (
                      <button
                        onClick={handleExtract}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Extract & Analyze
                      </button>
                    )}
                  </div>

                  {status === 'extracting' && (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                      <LoadingSpinner />
                      <p className="mt-4 text-gray-600 font-medium">
                        Extracting data using OCR...
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {extractedData && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Extracted Data
                      </h2>
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="text-xs font-medium text-gray-500 uppercase">Student Name</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {extractedData.studentName}
                          </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <p className="text-xs font-medium text-gray-500 uppercase">Roll Number</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {extractedData.rollNumber}
                          </p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                          <p className="text-xs font-medium text-gray-500 uppercase">Semester</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {extractedData.semester}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-l-4 border-yellow-500 pl-4">
                            <p className="text-xs font-medium text-gray-500 uppercase">SGPA</p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              {extractedData.sgpa}
                            </p>
                          </div>
                          <div className="border-l-4 border-orange-500 pl-4">
                            <p className="text-xs font-medium text-gray-500 uppercase">CGPA</p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              {extractedData.cgpa}
                            </p>
                          </div>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="text-xs font-medium text-gray-500 uppercase">Issue Date</p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {extractedData.issueDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {hash && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Hash className="h-6 w-6 text-gray-700" />
                        <h2 className="text-xl font-bold text-gray-900">Document Hash</h2>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs font-mono text-gray-900 break-all">
                          {hash}
                        </p>
                      </div>

                      {status === 'extracted' && (
                        <button
                          onClick={handleStoreOnBlockchain}
                          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          Store on Blockchain
                        </button>
                      )}

                      {status === 'storing' && (
                        <div className="mt-6 text-center">
                          <LoadingSpinner />
                          <p className="mt-4 text-gray-600 font-medium">
                            Storing on blockchain...
                          </p>
                        </div>
                      )}

                      {status === 'stored' && transactionHash && (
                        <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="bg-green-500 rounded-full p-1">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="font-bold text-green-700">Success!</p>
                          </div>
                          <p className="text-sm text-green-700 mb-3">
                            Certificate stored on blockchain
                          </p>
                          <div className="bg-white p-3 rounded">
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Transaction Hash
                            </p>
                            <p className="text-xs font-mono text-gray-900 break-all">
                              {transactionHash}
                            </p>
                          </div>
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
                  No certificates issued yet. Start by uploading your first certificate.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
