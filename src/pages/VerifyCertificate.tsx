import { useState } from 'react';
import { Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ExtractedData } from '../types/certificate'; // ✅ FIXED

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

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://localhost:8000/verify", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.error) {
        setStatus('invalid');
        return;
      }

      const parsed = result.data;

      // ✅ SAFE MAPPING
      const mappedData: ExtractedData = {
        studentName: parsed?.student_name || "N/A",
        semester: parsed?.semester || "N/A",
        sgpa: parsed?.sgpa?.toString() || "N/A",
        cgpa: parsed?.cgpa?.toString() || "N/A",
        rollNumber: parsed?.roll_number || "N/A",
        issueDate: parsed?.year_of_admission || "N/A",
      };

      setExtractedData(mappedData);
      setHash(result.hash);
      setConfidence(parsed?.ocr_confidence ?? 0); // ✅ safer

      if (result.status === "verified") {
        setStatus('valid');
      } else {
        setStatus('invalid');
      }

    } catch (err) {
      console.error("Verification error:", err);
      setStatus('invalid');
    }
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
                  ? 'This certificate has been verified and exists on blockchain'
                  : 'Certificate not found on blockchain. It may be invalid or not issued'
              }
            />
          )}

          {status === 'idle' && !selectedFile && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                How Verification Works
              </h3>

              <ol className="space-y-3 text-blue-800">
                {[ 
                  "Upload the certificate you want to verify",
                  "OCR extracts certificate data",
                  "Hash is checked on blockchain",
                  "Instant verification result"
                ].map((step, i) => (
                  <li key={i} className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}