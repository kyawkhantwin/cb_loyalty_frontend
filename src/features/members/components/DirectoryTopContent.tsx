'use client';
import React, {ChangeEvent} from 'react';
import {Search, ChevronDown, Plus} from 'lucide-react';
import {
    Button,
    Dropdown,
    Input,
    Label
} from "@heroui/react";

interface SearchFilterProps {
    filterValue: string;
    onFilterChange: (value: string) => void;
}


interface SearchFilterProps {
    filterValue: string;
    onFilterChange: (value: string) => void;
}

const SearchFilterInput = ({ filterValue, onFilterChange }: SearchFilterProps) => (
    <div className="relative w-full sm:max-w-[44%]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Search size={18} className="text-default-400" />
        </div>

        <Input
            fullWidth
            variant="primary"
            className="pl-10"
            placeholder="Search members..."
            value={filterValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterChange(e.target.value)}
        />

        {filterValue && (
            <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-default-400 hover:text-default-600"
                onClick={() => onFilterChange("")}
            >
                ×
            </button>
        )}
    </div>
);
const DirectoryActionButtons = ({ onAddClick }: { onAddClick?: () => void }) => (
    <div className="flex gap-3">
        <Dropdown>
                <Button variant="secondary">
                    Status
                    <ChevronDown size={18} className="ml-2" />
                </Button>

            <Dropdown.Popover>
                <Dropdown.Menu aria-label="Filter Status">
                    <Dropdown.Item id="active" textValue="Active">
                        <Label>Active</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="inactive" textValue="Inactive">
                        <Label>Inactive</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>

        <Button
            variant="primary"
            onPress={onAddClick}
        >
            <Plus size={18} className="mr-2" />
            Add Member
        </Button>

        <Button variant="outline">
            More
            <ChevronDown size={18} className="ml-2" />
        </Button>
    </div>
);export const DirectoryTopContent = ({
                                        filter: currentFilter,
                                        onFilterChange,
                                        onAdd: onAddClick
                                    }: {
    filter: string,
    onFilterChange: (value: string) => void,
    onAdd?: () => void
}) => (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <SearchFilterInput filterValue={currentFilter} onFilterChange={onFilterChange} />
            <DirectoryActionButtons onAddClick={onAddClick} />
        </div>
    </div>
);