import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { topic } = JSON.parse(event.body);

    if (!topic) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '주제를 입력해주세요.' }),
      };
    }

    // Step 1: Generate blog content with Gemini 3.0 Pro
    const textModel = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      systemInstruction: `당신은 사실에 입각한 정보만 제공하는 전문 블로거입니다.
1. 모든 정보는 사실 여부를 검증하고, 확실하지 않은 내용은 포함하지 마십시오.
2. 사실 기반의 내용에는 반드시 신뢰할 수 있는 출처(URL 등)를 괄호 안에 명시하십시오.
3. 추측성 글쓰기를 금지합니다.
4. HTML 태그(h2, h3, b, p, ul, li)를 사용하여 가독성 좋게 작성하십시오. 별도의 CSS 스타일은 인라인으로 넣지 말고 시맨틱 태그만 사용하십시오.
5. 블로그 글은 최소 800자 이상으로 작성하고, 구조화된 형태로 작성하십시오.
6. 제목(h2), 소제목(h3), 본문(p), 목록(ul, li) 등을 적절히 활용하십시오.`
    });

    const textPrompt = `"${topic}"에 대한 Tistory 블로그 포스팅을 작성해주세요.

요구사항:
- HTML 형식으로 작성 (h2, h3, p, ul, li, b 태그 사용)
- 최소 800자 이상
- 사실 기반의 정보만 포함
- 신뢰할 수 있는 출처 명시
- 구조화된 내용 (서론, 본론, 결론)
- CSS 스타일 없이 시맨틱 태그만 사용
- 이미지는 삽입하지 마세요 (나중에 추가됩니다)`;

    const textResult = await textModel.generateContent(textPrompt);
    const blogContent = textResult.response.text();

    // Step 2: Generate image with Imagen
    let imageBase64 = null;
    try {
      const imageModel = genAI.getGenerativeModel({
        model: 'imagen-3.0-generate-001'
      });

      const imagePrompt = `Create a high-quality, professional blog post featured image about "${topic}".
Style: Clean, modern, and visually appealing.
The image should be suitable for a blog post header.
Aspect ratio: 4:3 (1024x768)`;

      const imageResult = await imageModel.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: imagePrompt }]
        }],
        generationConfig: {
          temperature: 0.4,
          topP: 0.8,
          topK: 40,
        }
      });

      // Extract image data
      if (imageResult.response && imageResult.response.candidates && imageResult.response.candidates[0]) {
        const candidate = imageResult.response.candidates[0];
        if (candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.data) {
              imageBase64 = part.inlineData.data;
              break;
            }
          }
        }
      }
    } catch (imageError) {
      console.error('Image generation error:', imageError);
      // Continue without image if generation fails
    }

    // Step 3: Combine content with image
    let finalHtml = blogContent;

    if (imageBase64) {
      const imageTag = `<img src="data:image/png;base64,${imageBase64}" alt="${topic}" style="max-width: 100%; height: auto; margin: 20px 0;" />`;

      // Insert image after the first h2 tag or at the beginning
      const h2Index = finalHtml.indexOf('</h2>');
      if (h2Index !== -1) {
        finalHtml = finalHtml.slice(0, h2Index + 5) + '\n' + imageTag + '\n' + finalHtml.slice(h2Index + 5);
      } else {
        finalHtml = imageTag + '\n' + finalHtml;
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        html: finalHtml,
        hasImage: !!imageBase64,
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: '블로그 포스트 생성 중 오류가 발생했습니다.',
        details: error.message,
      }),
    };
  }
};
