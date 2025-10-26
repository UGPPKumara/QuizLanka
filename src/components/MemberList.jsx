import React, { useMemo } from 'react';

/**
 * MemberList: Sidebar with live scores
 * (Copied from src/App.jsx)
 */
const MemberList = ({ allUsers, currentUserId }) => {
    // Sort the list once, memoize it
    const sortedMembers = useMemo(() => {
        return [...allUsers].sort((a, b) => b.score - a.score);
    }, [allUsers]);

    return (
        <div className="card flex-1">
            <h2 className="font-display text-3xl text-teal-600 mb-4">Live Competition</h2>
            <div className="space-y-3 max-h-96 lg:max-h-[500px] overflow-y-auto pr-2">
                {sortedMembers.length === 0 && <p className="text-gray-500">No members yet...</p>}
                {sortedMembers.map((member, index) => (
                    <div 
                        key={member.userId} 
                        className={`flex items-center justify-between p-2 rounded-lg ${member.userId === currentUserId ? 'bg-teal-100' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-600 w-6 text-right">{index + 1}.</span>
                            <div>
                                <p className="font-semibold text-gray-800">{member.displayName}</p>
                                <p className="text-xs text-gray-500">Level {member.currentLevel}</p>
                            </div>
                        </div>
                        <span className="font-bold text-teal-600">{member.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberList;