// Presentational only — chips have no click handlers yet.
// When wired, clicking a chip should populate/submit the ask input.
export function ExamplePromptChips({ prompts }: { prompts: string[] }) {
  return (
    <div className="prompt-chips">
      {prompts.map((prompt) => (
        <button key={prompt} type="button" className="chip">
          {prompt}
        </button>
      ))}
    </div>
  );
}
