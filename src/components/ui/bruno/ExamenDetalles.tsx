import React from 'react';
interface ExamResult {
    details: QuestionResult[];
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timestamp: string;
    answers: Record<number, string>;
  }

  interface QuestionResult {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }

interface ExamAttemptDetailsProps {
  attempt: ExamResult;
  attemptNumber: number;
}

 const ExamAttemptDetails: React.FC<ExamAttemptDetailsProps> = ({ attempt, attemptNumber }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Detalles del Intento #{attemptNumber}</h2>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600">Fecha</p>
              <p className="font-medium">{new Date(attempt.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Puntuación</p>
              <p className="font-medium">{attempt.score.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-600">Respuestas Correctas</p>
              <p className="font-medium">{attempt.correctAnswers} de {attempt.totalQuestions}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Respuestas Detalladas</h3>
        {attempt.details.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              result.isCorrect 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center ${
                result.isCorrect 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {result.isCorrect ? '✓' : '✗'}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">
                  Pregunta {index + 1}: {result.question}
                </p>
                <div className="ml-4 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Tu respuesta:</span>
                    <p className={`font-medium ${
                      result.isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.userAnswer}
                    </p>
                  </div>
                  {/* {!result.isCorrect && (
                    <div className="text-sm">
                      <span className="text-gray-600">Respuesta correcta:</span>
                      <p className="font-medium text-green-700">{result.correctAnswer}</p>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamAttemptDetails