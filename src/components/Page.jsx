import { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import MessageContext from "./contexts/message/MessageContext";
import "./Fish.css";
import PersonSvg from "./PersonSvg";
import "./PersonSvg.css";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAxWPFgh2HTaNYibCDmzg352vVXR7HEZfg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const promptAIstringPre =
  "You are an expert in ocean pollution. Give a very short description of the impact of ";
const promptAIstringPost =
  " on rivers and water basins, focusing on oceans. Give only the description, do not present yourself.";

/**
 * Game component that renders either the round or the end screen and contacts
 * the API to record the game. Also manages the logic to end each round
 */
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setResponse] = useState("");

  const [firstQuestion, setFirstQuestion] = useState("");
  const [promptButtonFirstQuestion, setPromptButtonFirstQuestion] =
    useState(false);
  const [secondQuestion, setSecondQuestion] = useState("");
  const [promptButtonSecondQuestion, setPromptButtonSecondQuestion] =
    useState(false);
  const [thirdQuestion, setThirdQuestion] = useState("");
  const [promptButtonThirdQuestion, setPromptButtonThirdQuestion] =
    useState(false);
  const [fourthQuestion, setFourthQuestion] = useState("");
  const [promptButtonFourthQuestion, setPromptButtonFourthQuestion] =
    useState(false);

  async function aiRun(query) {
    setLoading(true);

    try {
      const result = await model.generateContent(query);
      const response = result.response;
      const text = response.text();
      setResponse(text);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleGeminiQuery = (query) => {
    setPromptButtonFirstQuestion(true);
    aiRun(query);
  };

  const { setError } = useContext(MessageContext);

  return (
    <Container>
      <Row>
        <Col
          sm={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Container className="w-100">
            <div
              className="fish-container position-absolute w-100 h-100"
              style={{ zIndex: -1 }}
            >
              <div
                className={`fish-group ${fourthQuestion !== "" ? "hide-fish" : ""}`}
              >
                <div className="fish fish1">🐠</div>
                <div className="fishSmall fish2">🐟</div>
                <div className="fishSmall fish3">🐟</div>
                <div className="fishSmall fish4">🐟</div>
                <div className="fish fish5">🐡</div>
              </div>
              {secondQuestion !== "" && (
                <div>
                  <div className="debris debris1">🍾</div>
                  <div className="debris debris2">👝</div>
                  <div className="debris debris3">🗑️</div>
                  <div className="debrisSmall debris4">🥤</div>
                  <div className="debrisSmall debris5">📦</div>
                </div>
              )}
              {thirdQuestion == "" ? (
                <div>
                  <div className="coral coral1">🪸</div>
                  <div className="coral coral2">🪸</div>
                  <div className="coral coral3">🪸</div>
                </div>
              ) : (
                <div>
                  <div className="coral coral1 dead">🪸</div>
                  <div className="coral coral2 dead">🪸</div>
                  <div className="coral coral3 dead">🪸</div>
                </div>
              )}
            </div>
            <PersonSvg
              firstQuestion={firstQuestion}
              secondQuestion={secondQuestion}
              thirdQuestion={thirdQuestion}
              fourthQuestion={fourthQuestion}
            />
          </Container>
        </Col>
        <Col
          sm={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Accordion defaultActiveKey="0" className="w-100">
            <Accordion.Item eventKey="0">
              <Accordion.Header>🍾 First Question</Accordion.Header>
              <Accordion.Body>
                {!firstQuestion ? (
                  <>
                    <p className="mb-4">
                      You are cooking your favorite dish: french fries, so now
                      you have some exhausted oil. What will you do?
                    </p>
                    <Row>
                      <Col className="d-grid">
                        <Button
                          variant="success"
                          className="w-100"
                          onClick={() => setFirstQuestion("success")}
                        >
                          Store it in a bottle and throw it in the trash
                        </Button>
                      </Col>
                      <Col className="d-grid">
                        <Button
                          variant="danger"
                          className="w-100"
                          onClick={() => setFirstQuestion("danger")}
                        >
                          Pour it down the sink
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <div>
                    <>
                      {firstQuestion == "success" ? (
                        <p className="mb-4">
                          This is a good idea, but you can do better! You can
                          recycle the oil! You can use it to make soap or
                          candles, or you can take it to a recycling center!
                        </p>
                      ) : (
                        <p className="mb-4">
                          This is not a good idea, you are polluting the water!
                          Oil is a big problem for the environment, it can clog
                          pipes and pollute rivers and seas! Don't you think it
                          is like clogging your arteries with cholesterol?
                        </p>
                      )}
                    </>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() =>
                        handleGeminiQuery(
                          promptAIstringPre +
                            "oil pollution" +
                            promptAIstringPost,
                        )
                      }
                    >
                      🧠 Ask the AI for more info
                    </Button>
                    <Modal
                      show={promptButtonFirstQuestion}
                      onHide={() => {
                        setResponse("");
                        setPromptButtonFirstQuestion(false);
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>AI Response</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {loading ? <p>Loading...</p> : <p>{aiResponse}</p>}
                      </Modal.Body>
                    </Modal>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>🗑️ Second Question</Accordion.Header>
              <Accordion.Body>
                {!secondQuestion ? (
                  <>
                    <p className="mb-4">
                      You are thirsty and you want to drink water. What will you
                      do?
                    </p>
                    <Row>
                      <Col className="d-grid">
                        <Button
                          variant="success"
                          className="w-100"
                          onClick={() => setSecondQuestion("success")}
                        >
                          Go to the kitchen and drink tap water from your
                          canteen
                        </Button>
                      </Col>
                      <Col className="d-grid">
                        <Button
                          variant="danger"
                          className="w-100"
                          onClick={() => setSecondQuestion("danger")}
                        >
                          Buy some plastic water bottles from the supermarket
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <div>
                    <>
                      {secondQuestion == "success" ? (
                        <p className="mb-4">
                          Nice job, you are reducing plastic waste, but
                          production and daily maintenance of the canteen have a
                          big environmental impact, sometimes bigger than
                          plastic bottles!
                        </p>
                      ) : (
                        <p className="mb-4">
                          This is a quick solution, but it does not help the
                          environment, and be careful to recycle it! 8 million
                          tons of plastic end up in the oceans every year. And
                          also you are drinking microplastics!
                        </p>
                      )}
                    </>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() =>
                        handleGeminiQuery(
                          promptAIstringPre +
                            "plastic pollution" +
                            promptAIstringPost,
                        )
                      }
                    >
                      🧠 Ask the AI for more info
                    </Button>
                    <Modal
                      show={promptButtonSecondQuestion}
                      onHide={() => {
                        setResponse("");
                        setPromptButtonSecondQuestion(false);
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>AI Response</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {loading ? <p>Loading...</p> : <p>{aiResponse}</p>}
                      </Modal.Body>
                    </Modal>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>🪸 Third Question</Accordion.Header>
              <Accordion.Body>
                {!thirdQuestion ? (
                  <>
                    <p className="mb-4">
                      You are swimming in the sea and you see a nice coral reef.
                      What will you do?
                    </p>
                    <Row>
                      <Col className="d-grid">
                        <Button
                          variant="success"
                          className="w-100"
                          onClick={() => setThirdQuestion("success")}
                        >
                          Record a video and share it on social media
                        </Button>
                      </Col>
                      <Col className="d-grid">
                        <Button
                          variant="danger"
                          className="w-100"
                          onClick={() => setThirdQuestion("danger")}
                        >
                          Take a piece of coral as a souvenir
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <div>
                    <>
                      {thirdQuestion == "success" ? (
                        <p className="mb-4">
                          Great job sharing the world's beauty! But beware—5% of
                          global energy powers ICTs, with social networks,
                          especially video sharing, driving energy-hungry data
                          centers. Consider the pollution each "Share" creates!
                        </p>
                      ) : (
                        <p className="mb-4">
                          This is not a good idea, you are destroying the
                          ecosystem! Coral reefs are the lungs of the ocean,
                          they produce oxygen and are home to many species!
                        </p>
                      )}
                    </>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() =>
                        handleGeminiQuery(
                          promptAIstringPre +
                            "coral extinction" +
                            promptAIstringPost,
                        )
                      }
                    >
                      🧠 Ask the AI for more info
                    </Button>
                    <Modal
                      show={promptButtonThirdQuestion}
                      onHide={() => {
                        setResponse("");
                        setPromptButtonThirdQuestion(false);
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>AI Response</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {loading ? <p>Loading...</p> : <p>{aiResponse}</p>}
                      </Modal.Body>
                    </Modal>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>🎣 Fourth Question</Accordion.Header>
              <Accordion.Body>
                {!fourthQuestion ? (
                  <>
                    <p className="mb-4">
                      You are hungry and you want to eat a snack. What will you
                      do?
                    </p>
                    <Row>
                      <Col className="d-grid">
                        <Button
                          variant="success"
                          className="w-100"
                          onClick={() => setFourthQuestion("success")}
                        >
                          Eat a nice steak
                        </Button>
                      </Col>
                      <Col className="d-grid">
                        <Button
                          variant="danger"
                          className="w-100"
                          onClick={() => setFourthQuestion("danger")}
                        >
                          Eat a dozen of tunas
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <div>
                    <>
                      {fourthQuestion == "success" ? (
                        <p className="mb-4">
                          Good, you are being moderate, but remember that the
                          meat industry is responsible for 5% of global
                          greenhouse gas emissions, more than all the cars,
                          planes, and ships in the world combined!
                        </p>
                      ) : (
                        <p className="mb-4">
                          This isn't a good idea—you're overeating! While tuna
                          is healthy and eco-friendly to farm, you're fueling
                          the trawling industry, which devastates seabeds and
                          kills marine life.
                        </p>
                      )}
                    </>
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() =>
                        handleGeminiQuery(
                          promptAIstringPre +
                            "trawling industry and its link to overeating" +
                            promptAIstringPost,
                        )
                      }
                    >
                      🧠 Ask the AI for more info
                    </Button>
                    <Modal
                      show={promptButtonFourthQuestion}
                      onHide={() => {
                        setResponse("");
                        setPromptButtonFourthQuestion(false);
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>AI Response</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {loading ? <p>Loading...</p> : <p>{aiResponse}</p>}
                      </Modal.Body>
                    </Modal>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Page;
