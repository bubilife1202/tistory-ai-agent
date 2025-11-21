import { useState } from 'react'
import { Wand2 } from 'lucide-react'

function TopicInput({ onGenerate, isLoading }) {
  const [topic, setTopic] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (topic.trim() && !isLoading) {
      onGenerate(topic.trim())
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            블로그 포스팅 주제를 입력하세요
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="예: 인공지능의 미래, 건강한 식습관, 여행 팁 등"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!topic.trim() || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Wand2 className="w-5 h-5" />
          <span>{isLoading ? '생성 중...' : '블로그 글 생성하기'}</span>
        </button>
      </form>

      <div className="mt-4 bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 팁:</span> 구체적인 주제를 입력할수록 더 정확하고 유용한 블로그 포스트가 생성됩니다.
        </p>
      </div>
    </div>
  )
}

export default TopicInput
