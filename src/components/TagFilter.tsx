interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export default function TagFilter({ tags, selectedTags, onTagClick }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
} 