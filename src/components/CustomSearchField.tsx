import React, { useState, useEffect, useRef } from "react";

interface CustomSearchFieldProps {
    value: { value: string; label: string } | null;
    onChange: (option: { value: string; label: string, id:string } | null) => void;
    onCreateOption: (inputValue: string) => void;
    options: Array<{ value: string; label: string, id:string}>;
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
    const [filteredOptions, setFilteredOptions] = useState<Array<{ value: string; label: string, id: string }>>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(value?.label || "");
    }, [value]);

    const normalizeText = (text: string) =>
        text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();

    const isInvalidInput = (text: string) => {
        const urlPattern = /^(https?:\/\/)/i;
        const xssPattern = /<script.*?>.*?<\/script>/gi;

        return urlPattern.test(text) || xssPattern.test(text);
    };

    useEffect(() => {
        if (!inputValue.trim()) {
            setFilteredOptions(options.slice(0, 10));
        } else {
            const filtered = options
                .filter(option => {
                    if (typeof option.label !== "string") return false;
                    const normalizedOption = normalizeText(option.label.toLowerCase());
                    const normalizedInput = normalizeText(inputValue.toLowerCase());
                    return normalizedOption.includes(normalizedInput);
                })
                .slice(0, 10);
            setFilteredOptions(filtered);
        }
        setHighlightedIndex(-1);
        setIsInvalid(isInvalidInput(inputValue));
    }, [inputValue, options]);

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

    const handleSelect = (option: { value: string; label: string, id: string }) => {
        onChange(option);
        setInputValue(option.label);
        onMenuClose();
        setIsInvalid(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
                break;
            case "Enter":
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIndex]);
                } else if (allowCustomValue && inputValue.trim() !== "" && filteredOptions.length === 0 && !isInvalid) {
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

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        setInputValue("");
        setIsInvalid(false);
        inputRef.current?.focus();
    };

    return (
        <div className="position-relative">
            <div className={`form-control d-flex align-items-center node-select ${isInvalid ? "border-danger" : ""}`} onClick={onMenuOpen}>
                <input
                    ref={inputRef}
                    type="text"
                    maxLength={100}
                    className="flex-grow-1 border-0 p-0 bg-transparent"
                    value={inputValue}
                    onChange={(e) => {
                        let newValue = e.target.value;
                        setInputValue(newValue);
                        setIsInvalid(isInvalidInput(newValue));
                        if (!menuIsOpen) onMenuOpen();
                    }}
                    onFocus={onMenuOpen}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    dir="auto"
                    style={{ outline: isInvalid ? "2px solid red" : "none" }}
                />
                {inputValue && (
                    <button className="btn btn-sm text-secondary bg-transparent border-0 p-0 ms-2" onClick={handleClear} type="button">
                        <i className="mdi mdi-close"></i>
                    </button>
                )}
            </div>

            {isInvalid && (
                <div className="text-danger small mt-1" style={{ animation: "fadeIn 0.5s ease-in-out" }}>
                    URLs or special characters are not allowed.
                </div>
            )}

            {menuIsOpen && (
                <div ref={dropdownRef} className="position-absolute w-100 mt-1 border rounded shadow-sm bg-white" style={{ maxHeight: "150px", overflowY: "auto", zIndex: 9999 }}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={option.value}
                                className={`p-2 cursor-pointer ${highlightedIndex === index ? "bg-light" : ""}`}
                                onClick={() => handleSelect(option)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : allowCustomValue && inputValue.trim() !== "" && !isInvalid && (
                        <div className="p-2 cursor-pointer text-primary" onClick={() => { onCreateOption(inputValue); onMenuClose(); }}>
                            <i className="mdi mdi-plus-circle me-1"></i>
                            Search "{inputValue}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomSearchField;
