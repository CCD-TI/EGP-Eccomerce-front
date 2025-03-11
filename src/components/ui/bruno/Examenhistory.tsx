import React from "react";
import { useState } from "react";
import ExamAttemptDetails from "./ExamenDetalles";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ExamHistoryProps {
  examId: number;
  attempts: ExamResult[];
}

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

const ExamHistory: React.FC<ExamHistoryProps> = ({ examId, attempts }) => {
  const [selectedAttempt, setSelectedAttempt] = useState<ExamResult | null>(null);
  const [selectedAttemptNumber, setSelectedAttemptNumber] = useState<number>(0);
  const detailsModal = useDisclosure();
  const scoreNotificationModal = useDisclosure();

  React.useEffect(() => {
    if (attempts && attempts.length > 0) {
      const latestAttempt = attempts[attempts.length - 1];
      setSelectedAttempt(latestAttempt);
      setSelectedAttemptNumber(attempts.length);
      scoreNotificationModal.onOpen();
    }
  }, [attempts]);

  if (!attempts || attempts.length === 0) {
    return null;
  }

  const handleViewDetails = (attempt: ExamResult, attemptNumber: number) => {
    setSelectedAttempt(attempt);
    setSelectedAttemptNumber(attemptNumber);
    detailsModal.onOpen();
  };

//   const getScoreColor = (score: number) => {
//     if (score >= 90) return "text-green-600";
//     if (score >= 70) return "text-yellow-600";
//     return "text-red-600";
//   };

  return (
    <>
      <div className=" w-full mt-4 p-2 bg-gray-50/70 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Historial de Intentos</h3>
        <div className="space-y-4">
          {attempts.map((attempt, index) => (
            <div key={index} className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Intento {index + 1} - Puntuación: {attempt.score.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">
                    Fecha: {new Date(attempt.timestamp).toLocaleString()}
                  </p>
                </div>
                <Button
                  onPress={() => handleViewDetails(attempt, index + 1)}
                  color="primary"
                  size="sm"
                >
                  Ver Detalles
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para detalles */}
      <Modal 
      isOpen={detailsModal.isOpen} 
      onOpenChange={detailsModal.onOpenChange}
      size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Detalles del Intento {selectedAttemptNumber}</ModalHeader>
              <ModalBody className="overflow-y-auto max-h-screen">
                {selectedAttempt && (
                  <ExamAttemptDetails attempt={selectedAttempt} attemptNumber={selectedAttemptNumber} />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal para notificación de puntuación */}
      {/* <Modal isOpen={scoreNotificationModal.isOpen} onOpenChange={scoreNotificationModal.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Resultado del Intento {selectedAttemptNumber}
              </ModalHeader>
              <ModalBody className="text-center">
                {selectedAttempt && (
                  <>
                    <p className={`text-3xl font-bold ${getScoreColor(selectedAttempt.score)}`}>
                      {selectedAttempt.score.toFixed(1)}%
                    </p>
                    <p className="mt-2 text-gray-600">
                      {selectedAttempt.score >= 70
                        ? "¡Felicidades! Has aprobado el examen."
                        : "No has aprobado el examen. ¡Sigue intentando!"}
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default ExamHistory;
