'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MeetingData {
    name: string;
    duration: string;
    dates: string[];
    times: string[];
    userName: string;
    places: string[];
}

interface MeetingCreationContextType {
    meetingData: MeetingData;
    updateMeetingData: (newData: Partial<MeetingData>) => void;
    resetMeetingData: () => void;
}

const MeetingCreationContext = createContext<MeetingCreationContextType | undefined>(undefined);

export const MeetingCreationProvider = ({ children }: { children: ReactNode }) => {
    const [meetingData, setMeetingData] = useState<MeetingData>({
        name: '',
        duration: '',
        dates: [],
        times: [],
        userName: '',
        places: [],
    });

    const updateMeetingData = (newData: Partial<MeetingData>) => {
        setMeetingData((prevData) => ({ ...prevData, ...newData }));
    };

    const resetMeetingData = () => {
        setMeetingData({
            name: '',
            duration: '',
            dates: [],
            times: [],
            userName: '',
            places: [],
        });
    };

    return (
        <MeetingCreationContext.Provider value={{ meetingData, updateMeetingData, resetMeetingData }}>
            {children}
        </MeetingCreationContext.Provider>
    );
};

export const useMeetingCreation = () => {
    const context = useContext(MeetingCreationContext);
    if (context === undefined) {
        throw new Error('useMeetingCreation must be used within a MeetingCreationProvider');
    }
    return context;
}; 