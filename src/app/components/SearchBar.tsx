export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="搜索文章..."
        className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--text-link)] transition-colors"
      />
    </div>
  );
} 