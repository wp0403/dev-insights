interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export default function TagFilter({ tags, selectedTags, onTagClick }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              isSelected
                ? 'bg-[var(--text-link)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}