import { useState, useEffect } from 'react'
import { Key, Eye, EyeOff } from 'lucide-react'

function ApiKeyInput({ apiKey, setApiKey }) {
  const [showKey, setShowKey] = useState(false)
  const [tempKey, setTempKey] = useState(apiKey)

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedKey = localStorage.getItem('gemini_api_key')
    if (savedKey) {
      setApiKey(savedKey)
      setTempKey(savedKey)
    }
  }, [setApiKey])

  const handleSave = () => {
    if (tempKey.trim()) {
      localStorage.setItem('gemini_api_key', tempKey.trim())
      setApiKey(tempKey.trim())
      alert('API 키가 저장되었습니다!')
    }
  }

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key')
    setApiKey('')
    setTempKey('')
    alert('API 키가 삭제되었습니다!')
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-md p-6 border-2 border-indigo-200">
      <div className="flex items-center space-x-2 mb-3">
        <Key className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Gemini API 키 설정</h3>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="Gemini API 키를 입력하세요"
            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={!tempKey.trim()}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            저장
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            삭제
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
          <p className="font-semibold mb-1">🔑 API 키 발급 방법:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Google AI Studio
              </a>에서 "Create API Key" 클릭
            </li>
            <li>생성된 API 키를 복사하여 위 입력창에 붙여넣기</li>
            <li>"저장" 버튼을 클릭하면 브라우저에 안전하게 저장됩니다</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyInput
