import { useState } from 'react'
import { Copy, Check, Eye, Code } from 'lucide-react'

function ResultDisplay({ htmlContent }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Copy Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">생성된 블로그 포스트</h2>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>복사 완료!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>HTML 복사하기</span>
            </>
          )}
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Preview */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 flex items-center space-x-2">
            <Eye className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">미리보기</h3>
          </div>
          <div
            className="p-6 overflow-auto max-h-[800px] prose prose-sm max-w-none"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            <style>{`
              .prose h2 {
                font-size: 1.5rem;
                font-weight: 700;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                color: #1f2937;
              }
              .prose h3 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 1.25rem;
                margin-bottom: 0.75rem;
                color: #374151;
              }
              .prose p {
                margin-bottom: 1rem;
                line-height: 1.7;
                color: #4b5563;
              }
              .prose ul {
                margin-left: 1.5rem;
                margin-bottom: 1rem;
              }
              .prose li {
                margin-bottom: 0.5rem;
                line-height: 1.6;
              }
              .prose b, .prose strong {
                font-weight: 600;
                color: #1f2937;
              }
              .prose img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                margin: 1.5rem 0;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>

        {/* Right Column: Raw HTML Code */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-3 flex items-center space-x-2">
            <Code className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">Tistory HTML 코드</h3>
          </div>
          <div className="p-6 overflow-auto max-h-[800px]">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-lg border border-gray-200">
              <code>{htmlContent}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">📝 Tistory에 적용하는 방법</h4>
        <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
          <li>"HTML 복사하기" 버튼을 클릭하여 코드를 복사합니다.</li>
          <li>Tistory 관리자 페이지에서 "글쓰기"를 클릭합니다.</li>
          <li>에디터 상단의 "HTML" 탭을 클릭합니다.</li>
          <li>복사한 HTML 코드를 붙여넣습니다.</li>
          <li>"기본모드" 탭으로 돌아가 미리보기를 확인합니다.</li>
        </ol>
      </div>
    </div>
  )
}

export default ResultDisplay
