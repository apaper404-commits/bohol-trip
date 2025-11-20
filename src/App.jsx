import React, { useState, useEffect, useRef } from 'react';
import { Plane, Waves, Sun, Moon, Utensils, MapPin, Camera, Coffee, Bed, ArrowRight, Info, Sparkles, X, MessageCircle, Send, Loader2, CheckSquare, Languages, Volume2 } from 'lucide-react';

const scheduleData = [
  {
    dayId: 0,
    date: "11.23 (일)",
    title: "보홀로 출발",
    highlight: "여행의 시작! 설레는 마음으로 공항으로 이동합니다.",
    events: [
      { time: "16:00", title: "공항 도착 및 출국 수속", type: "transport", icon: <Plane size={18} /> },
      { time: "18:00", endTime: "23:00", title: "진에어 탑승 (18:00~23:00)", type: "transport", icon: <Plane size={18} /> },
      { time: "23:30", title: "보홀 도착 및 입국 심사", type: "transport", icon: <MapPin size={18} /> },
      { time: "24:00", title: "숙소 체크인", type: "rest", icon: <Bed size={18} /> },
    ]
  },
  {
    dayId: 1,
    date: "11.24 (월)",
    title: "셀프 다이빙 & 육상 투어",
    highlight: "DAY 1은 탄력적으로 운영! 컨디션에 따라 댑댑 생추어리(수심 얕음)에서 워밍업. 육상투어 기사 컨택 필수.",
    events: [
      { time: "08:00", title: "조식", type: "food", icon: <Coffee size={18} /> },
      { time: "09:00", endTime: "12:00", title: "셀프 댑댑 생추어리 다이빙", type: "diving", icon: <Waves size={18} /> },
      { time: "12:00", title: "중식 및 빠른 정비", type: "food", icon: <Utensils size={18} /> },
      { time: "14:00", endTime: "18:00", title: "육상 투어 (초콜릿힐, 안경원숭이, 맨메이드 포레스트, 반딧불 투어)", type: "land", icon: <Camera size={18} /> },
      { time: "19:00", title: "늦은 저녁 및 야간 콘텐츠", type: "night", icon: <Moon size={18} /> },
      { time: "23:00", title: "취침", type: "rest", icon: <Bed size={18} /> },
    ]
  },
  {
    dayId: 2,
    date: "11.25 (화)",
    title: "발리카삭 호핑 투어",
    highlight: "한인업체(한바다호핑) 예약 예정. 인프라가 갖춰진 곳에서 편하게 다이빙! 흥정 스트레스 없이 리조트 즐기기.",
    events: [
      { time: "06:00", title: "기상 및 조식", type: "food", icon: <Coffee size={18} /> },
      { time: "07:00", endTime: "13:00", title: "발리카삭 호핑 투어", type: "diving", icon: <Waves size={18} /> },
      { time: "13:00", title: "중식", type: "food", icon: <Utensils size={18} /> },
      { time: "14:00", endTime: "17:00", title: "자유 휴식 시간", type: "leisure", icon: <Sun size={18} /> },
      { time: "18:00", title: "저녁 식사", type: "food", icon: <Utensils size={18} /> },
      { time: "20:00", title: "야간 콘텐츠 즐기기", type: "night", icon: <Moon size={18} /> },
      { time: "23:00", title: "취침", type: "rest", icon: <Bed size={18} /> },
    ]
  },
  {
    dayId: 3,
    date: "11.26 (수)",
    title: "나팔링 & 돌호비치",
    highlight: "다이빙 연습 성과 확인! 나팔링 정어리 떼와 산호 앞에서 영상 촬영. 돌호비치는 우리끼리 편하게.",
    events: [
      { time: "06:00", title: "기상 및 조식", type: "food", icon: <Coffee size={18} /> },
      { time: "07:00", endTime: "13:00", title: "나팔링 정어리 & 돌호비치 셀프 투어", type: "diving", icon: <Waves size={18} /> },
      { time: "13:00", title: "중식", type: "food", icon: <Utensils size={18} /> },
      { time: "14:00", endTime: "17:00", title: "자유 휴식 시간", type: "leisure", icon: <Sun size={18} /> },
      { time: "18:00", title: "저녁 식사", type: "food", icon: <Utensils size={18} /> },
      { time: "20:00", title: "야간 콘텐츠 즐기기", type: "night", icon: <Moon size={18} /> },
      { time: "23:00", title: "취침", type: "rest", icon: <Bed size={18} /> },
    ]
  },
  {
    dayId: 4,
    date: "11.27 (목)",
    title: "마지막 여유 & 귀국",
    highlight: "아쉬운 마지막 여유. 오셔니카 데이유즈 혹은 다른 활동. 샤워 후 개운하게 공항으로 이동.",
    events: [
      { time: "07:00", title: "조식", type: "food", icon: <Coffee size={18} /> },
      { time: "08:00", endTime: "12:00", title: "짐 싸기 및 휴식, 체크아웃", type: "leisure", icon: <Sun size={18} /> },
      { time: "12:00", title: "중식 (오셔니카)", type: "food", icon: <Utensils size={18} /> },
      { time: "13:00", endTime: "18:00", title: "오셔니카 데이유즈 (또는 경비행기/자유)", type: "diving", icon: <Waves size={18} /> },
      { time: "18:30", title: "최후의 만찬", type: "food", icon: <Utensils size={18} /> },
      { time: "20:00", title: "마사지 & 샤워 후 공항 이동", type: "night", icon: <Plane size={18} /> },
      { time: "23:00", title: "귀국 비행기 탑승", type: "transport", icon: <Plane size={18} /> },
    ]
  }
];

const getTypeStyles = (type) => {
  switch (type) {
    case 'diving':
      return 'bg-blue-100 text-blue-700 border-l-4 border-blue-500';
    case 'land':
      return 'bg-green-100 text-green-700 border-l-4 border-green-500';
    case 'food':
      return 'bg-orange-50 text-orange-700 border-l-4 border-orange-400';
    case 'rest':
    case 'leisure':
      return 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-400';
    case 'night':
      return 'bg-purple-100 text-purple-700 border-l-4 border-purple-500';
    case 'transport':
      return 'bg-gray-100 text-gray-700 border-l-4 border-gray-400';
    default:
      return 'bg-white text-gray-700 border-l-4 border-gray-300';
  }
};

// --- AI Feature 1: Packing List Modal ---
const AIPackingModal = ({ isOpen, onClose, schedule }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchPackingList();
    } else {
        setItems([]); // Reset on close
        setError(null);
    }
  }, [isOpen, schedule]);

  const fetchPackingList = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const apiKey = ""; // Environment handles key
        const prompt = `
            You are a travel expert. Based on the following schedule for a trip to Bohol, create a checklist of 5-7 essential items to pack for THIS SPECIFIC DAY. 
            Focus on unique items needed for the activities (e.g., diving gear for diving, mosquito repellent for jungle tours, passport for airport).
            
            Schedule: ${JSON.stringify(schedule)}
            
            Return ONLY a raw JSON object (no markdown formatting) with this structure:
            { "items": ["item1", "item2", "item3", "item4", "item5"] }
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();
        const content = JSON.parse(data.candidates[0].content.parts[0].text);
        setItems(content.items || []);
    } catch (err) {
        console.error(err);
        setError("리스트를 불러오지 못했어요.");
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
                <CheckSquare className="text-blue-500" size={20}/>
                오늘의 필수 준비물
            </h3>
            <button onClick={onClose}><X size={20} className="text-gray-400"/></button>
        </div>
        
        {isLoading ? (
            <div className="py-8 flex flex-col items-center text-gray-500 gap-2">
                <Loader2 className="animate-spin text-blue-500" size={32} />
                <span className="text-xs">일정을 분석 중입니다...</span>
            </div>
        ) : error ? (
            <div className="text-center text-red-500 py-4 text-sm">{error}</div>
        ) : (
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-blue-50 p-3 rounded-xl">
                        <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 accent-blue-500" />
                        <span className="text-gray-700 text-sm font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        )}
        <div className="mt-4 text-xs text-center text-gray-400">
            Gemini가 {schedule.date} 일정을 기반으로 추천했습니다.
        </div>
      </div>
    </div>
  );
};

// --- AI Feature 2: Daily Lingo Card ---
const AIDailyLingo = ({ schedule }) => {
    const [lingo, setLingo] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateLingo = async () => {
        setLoading(true);
        try {
            const apiKey = "";
            const prompt = `
                Provide ONE useful phrase in Cebuano (or Tagalog if Cebuano is too obscure) relevant to this travel schedule in Bohol.
                Schedule highlight: ${schedule.highlight}
                Events: ${schedule.events.map(e => e.title).join(', ')}

                If the day involves markets, teach bargaining. If diving, teach "beautiful" or "okay". If food, teach "delicious".
                
                Return ONLY a raw JSON object with:
                { "phrase": "The phrase in local language", "pronunciation": "Korean pronunciation", "meaning": "Korean meaning", "context": "Why this is useful today" }
            `;
             const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });
            const data = await response.json();
            const content = JSON.parse(data.candidates[0].content.parts[0].text);
            setLingo(content);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                    <Languages size={16} />
                    <span>오늘의 현지 회화</span>
                </div>
                {!lingo && !loading && (
                    <button 
                        onClick={generateLingo}
                        className="text-xs bg-white text-purple-600 px-2 py-1 rounded-md border border-purple-200 hover:bg-purple-100 shadow-sm transition-all flex items-center gap-1"
                    >
                        <Sparkles size={10} />
                        표현 받기
                    </button>
                )}
            </div>
            
            {loading && (
                <div className="flex items-center gap-2 text-xs text-purple-400 py-2">
                    <Loader2 className="animate-spin" size={14} />
                    상황에 맞는 표현을 찾는 중...
                </div>
            )}

            {lingo && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                    <div className="text-xl font-bold text-gray-800 mb-1">{lingo.phrase}</div>
                    <div className="text-sm text-purple-600 font-medium mb-2 flex items-center gap-1">
                        <Volume2 size={12} />
                        [{lingo.pronunciation}]
                    </div>
                    <div className="text-xs text-gray-500 mb-2 p-2 bg-white bg-opacity-60 rounded-lg">
                        "{lingo.meaning}"
                    </div>
                    <div className="text-[10px] text-gray-400">
                        💡 Tip: {lingo.context}
                    </div>
                </div>
            )}
             {!lingo && !loading && (
                <p className="text-xs text-gray-500">
                    오늘 일정에 딱 맞는 현지 표현을 배워보세요!
                </p>
            )}
        </div>
    )
}

// --- Existing AI Chat Modal ---
const AIAssistantModal = ({ isOpen, onClose, schedule }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { role: 'assistant', text: `안녕하세요! ${schedule.date} 일정에 대해 무엇이든 물어보세요.\n예: "이 날 맛집 추천해줘", "이동 시간 얼마나 걸려?"` }
      ]);
    }
  }, [isOpen, schedule]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userQuery = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setIsLoading(true);

    try {
      const apiKey = ""; // Environment handles key
      const scheduleContext = JSON.stringify(schedule);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a friendly travel assistant for a trip to Bohol, Philippines.
                     The user is asking a question about their schedule for a specific day.
                     Current Schedule Context: ${scheduleContext}
                     
                     User Question: ${userQuery}
                     
                     Please provide a helpful, concise response in Korean.
                     If asking for restaurants, suggest places near the likely location of the activities (e.g., Alona Beach, Loboc River, etc.).
                     If asking for packing lists, consider the activities (diving, land tour, etc.).
                     Use emojis to make it friendly.`
            }]
          }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "죄송합니다. 지금은 답변을 드릴 수 없네요.";

      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "오류가 발생했습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end sm:items-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-300" />
            <h3 className="font-bold">AI 여행 비서</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <Loader2 size={18} className="animate-spin text-blue-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="궁금한 점을 물어보세요..."
              className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !query.trim()}
              className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
          {/* Quick Prompts */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button onClick={() => setQuery("이 날 맛집 추천해줘")} className="flex-shrink-0 text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full border border-orange-100 hover:bg-orange-100">
              🍔 맛집 추천
            </button>
            <button onClick={() => setQuery("준비물 뭐 챙길까?")} className="flex-shrink-0 text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-100">
              🎒 준비물 체크
            </button>
            <button onClick={() => setQuery("현지 꿀팁 알려줘")} className="flex-shrink-0 text-xs bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full border border-purple-100 hover:bg-purple-100">
              💡 현지 꿀팁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isPackingModalOpen, setIsPackingModalOpen] = useState(false);

  const currentSchedule = scheduleData.find(d => d.dayId === activeDay);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-4 pb-8 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
        
        {/* Header Area */}
        <div className="bg-blue-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
            <Waves size={120} />
          </div>
          <div className="relative z-10">
            <h2 className="text-sm font-medium text-blue-100 mb-1">2025 프리다이빙 여행</h2>
            <h1 className="text-2xl font-bold mb-2">보홀 튜나의<br/>행복 여행 일정표</h1>
            <div className="flex items-center text-sm bg-blue-700 bg-opacity-40 self-start inline-flex px-3 py-1 rounded-full">
              <Plane size={14} className="mr-2" />
              <span>2025.11.23 - 11.27 (4박 5일)</span>
            </div>
          </div>
        </div>

        {/* Day Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide bg-white border-b border-gray-100 p-2 sticky top-0 z-20">
          {scheduleData.map((day) => (
            <button
              key={day.dayId}
              onClick={() => setActiveDay(day.dayId)}
              className={`flex-shrink-0 px-4 py-2 mx-1 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeDay === day.dayId
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              DAY {day.dayId}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="p-5 min-h-[500px] bg-gray-50 pb-24">
          
          {/* Date & Title */}
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="text-blue-600 mr-2">{currentSchedule.date}</span>
              {currentSchedule.title}
            </h3>
          </div>

          {/* Smart Packing Button (New Feature) */}
          <button 
            onClick={() => setIsPackingModalOpen(true)}
            className="w-full mb-6 bg-white border border-blue-100 text-blue-600 p-3 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-blue-50 transition-colors"
          >
            <CheckSquare size={18} />
            <span className="font-semibold text-sm">🎒 AI 스마트 짐싸기 (Checklist)</span>
          </button>

          {/* Timeline */}
          <div className="space-y-4 relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200 z-0"></div>

            {currentSchedule.events.map((event, index) => (
              <div key={index} className="relative z-10 flex group">
                {/* Time Column */}
                <div className="flex-shrink-0 w-10 pt-1 text-right mr-3">
                  <span className="text-xs font-bold text-gray-500 block">{event.time}</span>
                  {event.endTime && <span className="text-[10px] text-gray-400 block">- {event.endTime}</span>}
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-[14px] mt-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-400 z-10 group-hover:scale-125 transition-transform"></div>

                {/* Event Card */}
                <div className={`flex-grow p-3 rounded-xl shadow-sm mb-1 ${getTypeStyles(event.type)} transition-all duration-200 hover:shadow-md`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm mb-0.5">{event.title}</h4>
                      <span className="text-xs opacity-80 flex items-center gap-1">
                       {event.type === 'diving' && '🤿 프리다이빙'}
                       {event.type === 'land' && '📸 투어'}
                       {event.type === 'food' && '🍽️ 식사'}
                       {event.type === 'rest' && '🛌 휴식'}
                       {event.type === 'transport' && '✈️ 이동'}
                       {event.type === 'night' && '🌙 야간'}
                       {event.type === 'leisure' && '🏖️ 자유시간'}
                      </span>
                    </div>
                    <div className="opacity-80 mt-0.5">
                      {event.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight / Note Card */}
          <div className="mt-8 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full opacity-50 -mr-4 -mt-4"></div>
            <div className="flex items-start gap-3 relative z-10">
              <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                <Info size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">Travel Note</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {currentSchedule.highlight}
                </p>
              </div>
            </div>
          </div>

           {/* Daily Lingo (New Feature) */}
           <AIDailyLingo key={activeDay} schedule={currentSchedule} />

        </div>
        
        {/* Floating AI Button */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-none">
            <button 
                onClick={() => setIsAIModalOpen(true)}
                className="pointer-events-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-blue-200"
            >
                <Sparkles size={18} className="text-yellow-300" />
                <span className="font-bold">AI 여행 비서</span>
            </button>
        </div>

        {/* Footer / Nav Hint */}
        <div className="bg-white p-4 border-t border-gray-100 text-center text-xs text-gray-400 mb-12">
          Enjoy your trip in Bohol! 🐬
        </div>

        {/* Modals */}
        <AIAssistantModal 
            isOpen={isAIModalOpen} 
            onClose={() => setIsAIModalOpen(false)} 
            schedule={currentSchedule} 
        />
        
        <AIPackingModal
            isOpen={isPackingModalOpen}
            onClose={() => setIsPackingModalOpen(false)}
            schedule={currentSchedule}
        />

      </div>
    </div>
  );
}