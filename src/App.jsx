import { useState } from 'react'
import TopicInput from './components/TopicInput'
import ResultDisplay from './components/ResultDisplay'
import { Sparkles } from 'lucide-react'

function App() {
  const [generatedHtml, setGeneratedHtml] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async (topic) => {
    setIsLoading(true)
    setError('')
    setGeneratedHtml('')

    try {
      const response = await fetch('/.netlify/functions/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '블로그 포스트 생성에 실패했습니다.')
      }

      if (data.success) {
        setGeneratedHtml(data.html)
      } else {
        throw new Error('블로그 포스트 생성에 실패했습니다.')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error generating blog post:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tistory AI Blog Generator
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Gemini AI로 완벽한 블로그 포스팅을 자동 생성하세요
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopicInput onGenerate={handleGenerate} isLoading={isLoading} />

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">오류 발생</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">
              AI가 블로그 포스트를 생성하고 있습니다...
            </p>
            <p className="mt-2 text-sm text-gray-500">
              고품질 이미지와 내용을 준비 중입니다 (약 30초 소요)
            </p>
          </div>
        )}

        {generatedHtml && !isLoading && (
          <ResultDisplay htmlContent={generatedHtml} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Powered by Google Gemini AI | Made with React & Netlify
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
