"use client";

import { useMemo, useState, useEffect } from 'react';

const QUESTIONS = [
  {
    id: 'fit-style',
    text: 'Which best describes your Fall/Winter style?',
    answers: ['Cozy & casual', 'Sporty & layered', 'Minimal & clean', 'Classic & laid-back'],
  },
  {
    id: 'tops-prefer',
    text: 'Which tops are you most interested in?',
    answers: ['Crewnecks & hoodies', 'Flannels & plaids', 'Puffer & quilted', 'Knits & sweaters'],
  },
  {
    id: 'bottoms-prefer',
    text: 'What bottoms do you wear most?',
    answers: ['Jeans', 'Sweatpants', 'Cargo/Utility', 'Khakis'],
  },
  {
    id: 'budget',
    text: 'How do you usually shop seasonal drops?',
    answers: ['Build a full look', 'Pick up key pieces', 'Only essentials', 'Still exploring'],
  },
  {
    id: 'contact-pref',
    text: 'How would you like to get early access invites?',
    answers: ['Text', 'Email', 'Push notifications', 'All of the above'],
  },
];

export default function Page() {
  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('hollister-quiz') : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.answers) && typeof parsed.step === 'number') {
          setAnswers(parsed.answers);
          setStep(parsed.step);
          setComplete(parsed.complete === true);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      'hollister-quiz',
      JSON.stringify({ step, answers, complete })
    );
  }, [step, answers, complete]);

  const progress = useMemo(() => ((complete ? total : step) / total) * 100, [step, total, complete]);

  function handleSelect(answer) {
    const nextAnswers = [...answers];
    nextAnswers[step] = answer;
    setAnswers(nextAnswers);

    const isLast = step >= total - 1;
    if (isLast) {
      setComplete(true);
    } else {
      setStep(step + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setComplete(false);
  }

  return (
    <main className="page">
      {/* Header banner */}
      <div className="top-banner">
        <span role="img" aria-label="snow">??</span>
        <span className="banner-text"> 2025 Fall/Winter Feedback Program ? Limited Time </span>
        <span role="img" aria-label="snow">??</span>
      </div>

      {/* Centered logo */}
      <div className="logo" aria-label="Hollister">
        <span className="logo-bird" aria-hidden>? </span>
        <span className="logo-text">HOLLISTER</span>
      </div>

      {/* Progress bar */}
      <div className="progress-wrap" aria-label="Progress">
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="meta">
          <div className="pill">
            <span className="clock" aria-hidden>??</span>
            <span>Takes 1?2 minutes</span>
          </div>
          {!complete && (
            <div className="step" aria-live="polite">{step + 1} / {total}</div>
          )}
        </div>
      </div>

      {/* Question or completion */}
      {!complete ? (
        <section className="card">
          <h1 className="question">{QUESTIONS[step].text}</h1>
          <div className="answers">
            {QUESTIONS[step].answers.map((a) => (
              <button key={a} className="answer" onClick={() => handleSelect(a)}>
                {a}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="card done">
          <h1 className="question">You're in. Final step to confirm access.</h1>
          <p className="sub">We?ll tailor your $500 Fall/Winter picks and send early access.
          </p>
          <div className="answers">
            <a className="answer cta" href="#" onClick={(e)=>e.preventDefault()}>Continue</a>
            <button className="answer ghost" onClick={restart}>Restart</button>
          </div>
          <ul className="summary">
            {QUESTIONS.map((q, i) => (
              <li key={q.id}><span className="s-q">{q.text}</span><span className="s-a">{answers[i]}</span></li>
            ))}
          </ul>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <nav className="links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </nav>
        <div className="copy">? 2025 Hollister Feedback Program</div>
        <div className="domain">hollister-feedback.com</div>
      </footer>
    </main>
  );
}
