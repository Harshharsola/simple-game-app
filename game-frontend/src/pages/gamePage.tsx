import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SocketManager from "../socket/socketManager";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  dividerClasses,
} from "@mui/material";

const Modal = styled.div`
  background-color: white;
  width: 20%;
  minw-idth: 300px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 1.5%;
  gap: 10px;
`;
const Page = styled.div`
  background-color: #1f4d90;
  height: 100vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function GamePage(props: { userId: string | undefined }) {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [question, setQuestion] = useState<
    { id: string; text: string } | undefined
  >();
  const [optionsArray, setOptionsArray] = useState<
    { id: string; optionText: string; isCorrect: boolean }[] | undefined
  >();
  //   const [props.userId, setUserId] = useState<any>(localStorage.getItem("userId"));
  const [selectedAnswer, setSelectedAnswer] = useState<any>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [noMoreQuestions, setNoMoreQuestions] = useState<boolean>(false);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [playerWon, setPlayerWon] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const socket = SocketManager.getInstance();
  const handleNext = () => {
    question &&
      socket.emit("answer:submit", {
        sessionId,
        playerId: props.userId,
        questionId: question.id,
        optionId: selectedAnswer,
      });
  };
  const handleChange = (event: any) => {
    setSelectedAnswer(event.target.value);
  };

  const handleResponse = (response: any) => {
    console.log(response, !response.question);
    if (!response.question) {
      setNoMoreQuestions(true);
      setPlayerScore(response.playerScore);
      return;
    } else {
      const questionObj = {
        id: response.question.question._id,
        text: response.question.question.question,
      };
      const options = response.question.optionsArray.map((option: any) => {
        return {
          id: option._id,
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        };
      });
      setOptionsArray(options);
      setQuestion(questionObj);

      setSessionId(response.sessionId);
    }
  };

  useEffect(() => {
    socket.emit("game:join", { userId: props.userId });
    socket.on("game:init", (response: any) => {
      setLoading(false);
      handleResponse(response);
    });
    socket.on("question:send", (response: any) => {
      handleResponse(response);
    });

    socket.on("game:end", (response: any) => {
      console.log(response);
      setGameOver(true);
      setPlayerScore(response.playerScore);
      if (response.playerScore > response.otherPlayerScore) {
        setPlayerWon(true);
      } else if (response.playerScore < response.otherPlayerScore) {
        setPlayerWon(false);
      } else {
        setPlayerWon(null);
      }
    });
  }, []);
  return (
    <Page>
      {!noMoreQuestions && !gameOver ? (
        <Modal>
          {!loading ? (
            <>
              <div>{question !== undefined && <div>{question.text}</div>}</div>
              <div>
                <FormControl>
                  <FormLabel id="options">
                    <RadioGroup onChange={handleChange}>
                      {optionsArray !== undefined &&
                        optionsArray.map((option) => {
                          return (
                            <FormControlLabel
                              key={option.id}
                              value={option.id}
                              label={option.optionText}
                              control={<Radio />}
                            />
                          );
                        })}
                    </RadioGroup>
                  </FormLabel>
                </FormControl>
              </div>
            </>
          ) : (
            <div>Matchmaking in progress</div>
          )}{" "}
          <div>{!loading && <Button onClick={handleNext}>Next</Button>}</div>
        </Modal>
      ) : (
        <Modal>
          <div>Your Score : {playerScore}</div>
          {gameOver ? (
            <div>
              {playerWon && "you won"}
              {playerWon === false && "you lost"}
              {playerWon === null && "Draw"}
            </div>
          ) : (
            <div>waiting for other player to complete</div>
          )}
        </Modal>
      )}
    </Page>
  );
}

export default GamePage;
