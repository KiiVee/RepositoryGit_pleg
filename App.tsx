// src/App.tsx
import React, { useState } from 'react';
import { getResponse } from './util'; // Make sure this file exists
import './style.css';
const DEFAULT_RESPONSE = 'Verdict will show here';

export function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(DEFAULT_RESPONSE);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleReset = () => {
        setInput('');
        setOutput(DEFAULT_RESPONSE);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input.trim()) {
            alert('Please enter some text to check.');
            return;
        }

        try {
            const result = await getResponse(input);
            setOutput(result);
        } catch (error: any) {
            alert('Error: ' + error.message);
        }
    };

    const determineBannerClass = () => {
        if (output === 'Plagiarized') return 'warning';
        if (output === 'Not Plagiarized') return 'success';
        return '';
    };

    return (
        <div>
            <h1>Plagiarism Detection Service</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="prompt">Text to Check</label>
                <textarea
                    rows={5}
                    cols={60}
                    name="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Enter text to check"
                />
                <div>
                    <button type="reset" onClick={handleReset}>Clear</button>
                    <button type="submit" disabled={!input}>Submit</button>
                </div>
            </form>
            <div className={determineBannerClass()}>
                <h2>Verdict</h2>
                <p>{output}</p>
            </div>
        </div>
    );
}
