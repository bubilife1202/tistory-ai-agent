import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import TopicInput from './components/TopicInput'
import ResultDisplay from './components/ResultDisplay'
import ApiKeyInput from './components/ApiKeyInput'
import { Sparkles } from 'lucide-react'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [generatedHtml, setGeneratedHtml] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async (topic) => {
    if (!apiKey) {
      setError('먼저 Gemini API 키를 입력하고 저장해주세요.')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedHtml('')

    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        systemInstruction: `당신은 사실에 입각한 정보만 제공하는 전문 블로거입니다.
1. 모든 정보는 사실 여부를 검증하고, 확실하지 않은 내용은 포함하지 마십시오.
2. 사실 기반의 내용에는 반드시 신뢰할 수 있는 출처(URL 등)를 괄호 안에 명시하십시오.
3. 추측성 글쓰기를 금지합니다.
4. HTML 태그(h2, h3, b, p, ul, li)를 사용하여 가독성 좋게 작성하십시오. 별도의 CSS 스타일은 인라인으로 넣지 말고 시맨틱 태그만 사용하십시오.
5. 블로그 글은 최소 800자 이상으로 작성하고, 구조화된 형태로 작성하십시오.
6. 제목(h2), 소제목(h3), 본문(p), 목록(ul, li) 등을 적절히 활용하십시오.`
      })

      const prompt = `"${topic}"에 대한 Tistory 블로그 포스팅을 작성해주세요.

요구사항:
- HTML 형식으로 작성 (h2, h3, p, ul, li, b 태그 사용)
- 최소 800자 이상
- 사실 기반의 정보만 포함
- 신뢰할 수 있는 출처 명시
- 구조화된 내용 (서론, 본론, 결론)
- CSS 스타일 없이 시맨틱 태그만 사용
- 이미지는 삽입하지 마세요`

      const result = await model.generateContent(prompt)
      const htmlContent = result.response.text()

      setGeneratedHtml(htmlContent)
    } catch (err) {
      console.error('Error generating blog post:', err)

      if (err.message.includes('API_KEY_INVALID') || err.message.includes('API key')) {
        setError('API 키가 올바르지 않습니다. API 키를 다시 확인해주세요.')
      } else {
        setError(`블로그 포스트 생성 중 오류가 발생했습니다: ${err.message}`)
      }
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* API Key Input */}
        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />

        {/* Topic Input */}
        <TopicInput onGenerate={handleGenerate} isLoading={isLoading} disabled={!apiKey} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">오류 발생</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">
              AI가 블로그 포스트를 생성하고 있습니다...
            </p>
            <p className="mt-2 text-sm text-gray-500">
              약 20-30초 소요됩니다
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
            Powered by Google Gemini AI | Made with React & Vite
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
