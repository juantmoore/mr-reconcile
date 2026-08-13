export function ExamplePromptChips({
  prompts,
  onSelect,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="prompt-chips" aria-label="Example questions">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          className="chip"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}