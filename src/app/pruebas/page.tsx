"use client"
import { useState } from 'react';

export default function Survey() {
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    { id: 1, type: 'range', question: '¿Qué tan satisfecho estás con nuestro servicio? (1-10)' },
    { id: 2, type: 'yesno', question: '¿Recomendarías este servicio a un amigo?' },
    { id: 3, type: 'text', question: '¿Qué podemos mejorar en nuestro servicio?' },
    { id: 4, type: 'range', question: 'Califica la calidad del producto (1-10)' },
    { id: 5, type: 'yesno', question: '¿Volverías a utilizar este servicio?' },
    { id: 6, type: 'text', question: '¿Qué fue lo que más te gustó?' },
    { id: 7, type: 'range', question: 'Califica la atención al cliente (1-10)' },
  ];

  const handleChange = (id:any, value:any) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Encuesta</h1>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block font-medium mb-2">
                {q.question}
              </label>
              {q.type === 'range' && (
                <input
                  type="range"
                  min="1"
                  max="10"
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="w-full"
                />
              )}
              {q.type === 'yesno' && (
                <div className="space-x-4">
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value="Sí"
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                    Sí
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value="No"
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                    No
                  </label>
                </div>
              )}
              {q.type === 'text' && (
                <textarea
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="w-full border rounded p-2 text-black"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Tus respuestas</h2>
          <ul className="list-disc pl-5">
            {questions.map((q) => (
              <li key={q.id}>
                <strong>{q.question}</strong>
                <p>{(responses as any)[q.id]  || 'No respondido'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}