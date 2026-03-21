import { useState } from 'react';
import { Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';

interface ExtractedData {
  studentName: string;
  semester: string;
  sgpa: string;
  cgpa: string;
  rollNumber: string;
  issueDate: string;
}

export default function VerifyCertificate() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'valid' | 'invalid'>('idle');
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [hash, setHash] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStatus('idle');
    setExtractedData(null);
    setHash('');
    setConfidence(0);
  };

  const handleVerify = async () => {
    if (!selectedFile) return;

    setStatus('processing');

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

      const isValid = Math.random() > 0.3;

      setExtractedData(mockData);
      setHash(mockHash);
      setConfidence(Math.floor(Math.random() * 15) + 85);
      setStatus(isValid ? 'valid' : 'invalid');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Verify Certificate
            </h1>
            <p className="text-xl text-gray-600">
              Upload a certificate to verify its authenticity on the blockchain
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Upload Certificate
            </h2>
            <FileUpload onFileSelect={handleFileSelect} />

            {selectedFile && status === 'idle' && (
              <button
                onClick={handleVerify}
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Verify Certificate
              </button>
            )}
          </div>

          {status === 'processing' && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <LoadingSpinner />
              <p className="mt-6 text-lg text-gray-600 font-medium">
                Processing certificate...
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Extracting data and verifying against blockchain
              </p>
            </div>
          )}

          {(status === 'valid' || status === 'invalid') && (
            <ResultCard
              status={status}
              extractedData={extractedData || undefined}
              hash={hash}
              confidence={confidence}
              message={
                status === 'valid'
                  ? 'This certificate has been verified and matches blockchain records'
                  : 'This certificate could not be verified. It may be tampered or not registered'
              }
            />
          )}

          {status === 'idle' && !selectedFile && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                How Verification Works
              </h3>
              <ol className="space-y-3 text-blue-800">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Upload the certificate you want to verify (PDF, JPG, or PNG)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Our OCR system extracts the certificate data automatically</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>The certificate hash is compared against blockchain records</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <span>Instant verification result with detailed information</span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
