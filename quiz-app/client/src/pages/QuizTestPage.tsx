import { useSections, useTopics, useQuestions } from '../hooks/useQuizAPI'
import { useState } from 'react'

export default function QuizTestPage() {
    const [selectedSection, setSelectedSection] = useState<number | undefined>()
    const [selectedTopic, setSelectedTopic] = useState<number | undefined>()

    const { sections, loading: sectionsLoading, error: sectionsError } = useSections()
    const { topics, loading: topicsLoading, error: topicsError } = useTopics(selectedSection)
    const { questions, loading: questionsLoading, error: questionsError, submitAnswer } = useQuestions(selectedTopic)

    if (sectionsLoading) return <div className="p-6">Bölümler yükleniyor...</div>
    if (sectionsError) return <div className="p-6 text-red-500">Hata: {sectionsError}</div>

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">
                Quiz Test Sayfası
            </h1>

            {/* Sections */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Bölümler ({sections.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setSelectedSection(section.id)
                                setSelectedTopic(undefined)
                            }}
                            className={`p-3 rounded-lg border text-left hover:bg-gray-50 ${selectedSection === section.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300'
                                }`}
                        >
                            <strong>{section.name}</strong>
                        </button>
                    ))}
                </div>
            </div>

            {/* Topics */}
            {selectedSection && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                        Konular {topicsLoading ? '(yükleniyor...)' : `(${topics.length})`}
                    </h2>
                    {topicsError && <p className="text-red-500 mb-3">Hata: {topicsError}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {topics.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => setSelectedTopic(topic.id)}
                                className={`p-3 rounded-lg border text-left hover:bg-gray-50 ${selectedTopic === topic.id
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-300'
                                    }`}
                            >
                                <strong>{topic.name}</strong>
                                <div className="text-sm text-gray-600">Section ID: {topic.sectionId}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Questions */}
            {selectedTopic && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                        Sorular {questionsLoading ? '(yükleniyor...)' : `(${questions.length})`}
                    </h2>
                    {questionsError && <p className="text-red-500 mb-3">Hata: {questionsError}</p>}

                    <div className="space-y-6">
                        {questions.map(question => (
                            <div key={question.id} className="p-4 border border-gray-300 rounded-lg">
                                <h3 className="font-semibold text-lg mb-3">
                                    {question.id}. {question.text}
                                </h3>
                                <div className="space-y-2">
                                    {question.choices.map((choice, index) => (
                                        <button
                                            key={index}
                                            onClick={async () => {
                                                const isCorrect = await submitAnswer(question, index)
                                                alert(isCorrect ? '✅ Doğru!' : '❌ Yanlış!')
                                            }}
                                            className={`block w-full p-2 text-left rounded border hover:bg-gray-50 ${index === question.answerIndex
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-300'
                                                }`}
                                        >
                                            {String.fromCharCode(65 + index)}. {choice}
                                            {index === question.answerIndex && ' ✅'}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    Doğru cevap: {question.answerIndex} ({String.fromCharCode(65 + question.answerIndex)})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* API Status */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">API Status</h3>
                <ul className="space-y-1 text-sm">
                    <li>✅ Sections: {sections.length} kayıt</li>
                    <li>✅ Topics: {selectedSection ? topics.length : '❌'} kayıt</li>
                    <li>✅ Questions: {selectedTopic ? questions.length : '❌'} kayıt</li>
                </ul>
            </div>
        </div>
    )
}
