import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ExtractedData {
  studentName?: string;
  semester?: string;
  sgpa?: string;
  cgpa?: string;
  rollNumber?: string;
  issueDate?: string;
  [key: string]: string | undefined;
}

interface ResultCardProps {
  status: 'valid' | 'invalid' | 'pending' | 'processing';
  extractedData?: ExtractedData;
  hash?: string;
  transactionHash?: string;
  confidence?: number;
  message?: string;
}

export default function ResultCard({
  status,
  extractedData,
  hash,
  transactionHash,
  confidence,
  message,
}: ResultCardProps) {

  const getStatusConfig = () => {
    switch (status) {
      case 'valid':
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          title: 'Certificate Verified',
          subtitle: 'This certificate exists on blockchain and is authentic',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-700',
        };
      case 'invalid':
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          title: 'Not Found on Blockchain',
          subtitle: 'This certificate is not registered on blockchain',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-700',
        };
      case 'processing':
        return {
          icon: <AlertCircle className="h-16 w-16 text-blue-500 animate-pulse" />,
          title: 'Processing...',
          subtitle: 'Extracting data and verifying certificate',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-700',
        };
      default:
        return {
          icon: <AlertCircle className="h-16 w-16 text-yellow-500" />,
          title: 'Pending Verification',
          subtitle: 'Upload a certificate to begin verification',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-700',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`border-2 ${config.borderColor} ${config.bgColor} rounded-xl p-8`}>

      {/* STATUS */}
      <div className="flex flex-col items-center text-center mb-6">
        {config.icon}
        <h2 className={`text-2xl font-bold mt-4 ${config.textColor}`}>
          {config.title}
        </h2>
        <p className="text-gray-600 mt-2">{config.subtitle}</p>

        {message && (
          <p className="text-sm text-gray-500 mt-2 italic">{message}</p>
        )}
      </div>

      {/* ⚠️ OCR WARNING */}
      {typeof confidence === 'number' && confidence < 60 && (
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800 font-medium">
            ⚠️ Low OCR confidence ({confidence}%). Extracted data may be inaccurate.
          </p>
        </div>
      )}

      {/* EXTRACTED DATA */}
      {extractedData && Object.keys(extractedData).length > 0 && (
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Extracted Data
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(extractedData).map(([key, value]) => {
              if (!value) return null;

              return (
                <div key={key} className="border-l-4 border-blue-500 pl-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* OCR CONFIDENCE */}
      {typeof confidence === 'number' && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              OCR Confidence
            </span>
            <span className="text-sm font-bold text-blue-600">
              {confidence}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 🔐 BLOCKCHAIN PROOF */}
      {status === 'valid' && hash && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 mb-2">
            Verified on Blockchain
          </p>
          <p className="text-xs text-green-600 font-semibold mb-2">
            ✔ Immutable record found
          </p>

          <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-3 rounded">
            {hash}
          </p>
        </div>
      )}

      {/* HASH (invalid case) */}
      {status === 'invalid' && hash && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 mb-2">
            Generated Document Hash
          </p>
          <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-3 rounded">
            {hash}
          </p>
        </div>
      )}

      {/* TRANSACTION HASH */}
      {transactionHash && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500 mb-2">
            Transaction Hash
          </p>

          <p className="text-xs font-mono text-gray-900 break-all bg-gray-50 p-3 rounded">
            {transactionHash}
          </p>

          {/* ✅ Etherscan link */}
          <a
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xs underline mt-2 block"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
}