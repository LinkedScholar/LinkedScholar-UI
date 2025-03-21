import React, { useState, useEffect, useRef } from "react";

interface CustomSearchFieldProps {
    value: { value: string; label: string } | null;
    onChange: (option: { value: string; label: string } | null) => void;
    onCreateOption: (inputValue: string) => void;
    options: Array<{ value: string; label: string }>;
    placeholder: string;
    allowCustomValue?: boolean;
    menuIsOpen: boolean;
    onMenuOpen: () => void;
    onMenuClose: () => void;
}

const CustomSearchField: React.FC<CustomSearchFieldProps> = ({
                                                                 value,
                                                                 onChange,
                                                                 onCreateOption,
                                                                 options,
                                                                 placeholder,
                                                                 allowCustomValue = true,
                                                                 menuIsOpen,
                                                                 onMenuOpen,
                                                                 onMenuClose
                                                             }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<Array<{ value: string; label: string }>>(options.slice(0, 10));
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize input value when a value is passed
    useEffect(() => {
        setInputValue(value?.label || "");
    }, [value]);

    // Filter options based on input
    useEffect(() => {
        if (inputValue.trim() === "") {
            setFilteredOptions(options.slice(0, 10)); // Show first 10 options when empty
        } else {
            const filtered = options
                .slice(0, 10); // Limit to 10 results for better performance
            setFilteredOptions(filtered);
        }

        // Reset highlighted index when options change
        setHighlightedIndex(-1);
    }, [inputValue, options]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                onMenuClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onMenuClose]);

    // Handle option selection
    const handleSelect = (option: { value: string; label: string }) => {
        onChange(option);
        setInputValue(option.label);
        onMenuClose();
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
                break;
            case "Enter":
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIndex]);
                } else if (allowCustomValue && inputValue.trim() !== "" && filteredOptions.length === 0) {
                    onCreateOption(inputValue);
                    onMenuClose();
                }
                break;
            case "Escape":
                e.preventDefault();
                onMenuClose();
                break;
            default:
                break;
        }
    };

    // Clear the current selection
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        setInputValue("");
        inputRef.current?.focus();
    };

    return (
        <div className="position-relative">
            <div
                className="form-control d-flex align-items-center node-select"
                onClick={() => {
                    onMenuOpen();
                    inputRef.current?.focus();
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-grow-1 border-0 p-0 bg-transparent"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        if (!menuIsOpen) onMenuOpen();
                    }}
                    onFocus={() => onMenuOpen()}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                />
                {inputValue && (
                    <button
                        className="btn btn-sm text-secondary bg-transparent border-0 p-0 ms-2"
                        onClick={handleClear}
                        type="button"
                    >
                        <i className="mdi mdi-close"></i>
                    </button>
                )}
            </div>

            {menuIsOpen && (
                <div
                    ref={dropdownRef}
                    className="position-absolute w-100 mt-1 border rounded shadow-sm bg-white"
                    style={{ maxHeight: "150px", overflowY: "auto", zIndex: 9999 }}
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={option.value}
                                className={`p-2 cursor-pointer ${
                                    highlightedIndex === index ? "bg-light" : ""
                                }`}
                                onClick={() => handleSelect(option)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        allowCustomValue && inputValue.trim() !== "" ? (
                            <div
                                className="p-2 cursor-pointer text-primary"
                                onClick={() => {
                                    onCreateOption(inputValue);
                                    onMenuClose();
                                }}
                            >
                                <i className="mdi mdi-plus-circle me-1"></i>
                                Search "{inputValue}"
                            </div>
                        ) : (
                            <div className="p-2 text-muted">No matches found for "{inputValue}"</div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomSearchField;