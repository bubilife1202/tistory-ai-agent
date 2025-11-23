import { useState } from 'react'
import { Wand2, Image as ImageIcon } from 'lucide-react'

function TopicInput({ onGenerate, isLoading, disabled }) {
  const [topic, setTopic] = useState('')
  const [imageOptions, setImageOptions] = useState({
    enabled: true,
    resolution: '2K',
    aspectRatio: '16:9'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (topic.trim() && !isLoading && !disabled) {
      onGenerate(topic.trim(), imageOptions)
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
            placeholder={disabled ? "먼저 API 키를 입력하고 저장해주세요" : "예: 인공지능의 미래, 건강한 식습관, 여행 팁 등"}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading || disabled}
          />
        </div>

        {/* Image Options */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-3">
            <ImageIcon className="w-5 h-5 text-purple-600" />
            <label className="text-sm font-medium text-gray-700">
              대표 이미지 옵션
            </label>
          </div>

          <div className="space-y-3">
            {/* Enable/Disable Image */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={imageOptions.enabled}
                onChange={(e) => setImageOptions({...imageOptions, enabled: e.target.checked})}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                disabled={isLoading || disabled}
              />
              <span className="text-sm text-gray-700">
                AI 이미지 자동 생성 <span className="text-purple-600 font-semibold">(Gemini 3 Pro - Thinking Mode)</span>
              </span>
            </label>

            {/* Resolution & Aspect Ratio Options */}
            {imageOptions.enabled && (
              <div className="ml-6 space-y-3 bg-purple-50 p-3 rounded-lg">
                {/* Resolution */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    해상도
                  </label>
                  <div className="flex space-x-2">
                    {['1K', '2K', '4K'].map((res) => (
                      <button
                        key={res}
                        type="button"
                        onClick={() => setImageOptions({...imageOptions, resolution: res})}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                          imageOptions.resolution === res
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-purple-100'
                        }`}
                        disabled={isLoading || disabled}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    비율
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['1:1', '16:9', '4:3', '3:2', '9:16'].map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setImageOptions({...imageOptions, aspectRatio: ratio})}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                          imageOptions.aspectRatio === ratio
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-purple-100'
                        }`}
                        disabled={isLoading || disabled}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-purple-700">
                  💡 <span className="font-semibold">2K + 16:9</span>이 블로그 대표 이미지에 가장 적합합니다.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!topic.trim() || isLoading || disabled}
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
