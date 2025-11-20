import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert, SafeAreaView, StatusBar, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Plane, Waves, Sun, Moon, Utensils, MapPin, Camera, Coffee, Bed, Info, Sparkles, X, Send, Loader2 } from 'lucide-react-native';

// API KEY 설정: GitHub에 올리지 않고 Vercel 환경 변수에서 가져옵니다.
// 이 변수는 Vercel 설정 후 import.meta.env.VITE_GEMINI_API_KEY를 통해 주입됩니다.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

// API_KEY가 설정되지 않았거나 기본값으로 남아있는 경우를 대비한 유효성 검사 (추가)
const validateApiKey = () => {
  if (!API_KEY) {
    alert("API 키가 설정되지 않았습니다. Vercel 환경 변수를 확인해주세요.");
    return false;
  }
  return true;
};

// ... (나머지 코드는 동일)

const handleSend = async () => {
    if (!validateApiKey()) {
        setIsLoading(false);
        return;
    }
    // ... (이하 로직은 동일)


const scheduleData = [
  {
    dayId: 0,
    date: "11.23 (일)",
    title: "보홀로 출발",
    highlight: "여행의 시작! 설레는 마음으로 공항으로 이동합니다.",
    events: [
      { time: "16:00", title: "공항 도착 및 출국 수속", type: "transport", icon: Plane },
      { time: "18:00", endTime: "23:00", title: "진에어 탑승 (18:00~23:00)", type: "transport", icon: Plane },
      { time: "23:30", title: "보홀 도착 및 입국 심사", type: "transport", icon: MapPin },
      { time: "24:00", title: "숙소 체크인", type: "rest", icon: Bed },
    ]
  },
  {
    dayId: 1,
    date: "11.24 (월)",
    title: "셀프 다이빙 & 육상 투어",
    highlight: "DAY 1은 탄력적으로 운영! 컨디션에 따라 댑댑 생추어리(수심 얕음)에서 워밍업. 육상투어 기사 컨택 필수.",
    events: [
      { time: "08:00", title: "조식", type: "food", icon: Coffee },
      { time: "09:00", endTime: "12:00", title: "셀프 댑댑 생추어리 다이빙", type: "diving", icon: Waves },
      { time: "12:00", title: "중식 및 빠른 정비", type: "food", icon: Utensils },
      { time: "14:00", endTime: "18:00", title: "육상 투어 (초콜릿힐, 안경원숭이 등)", type: "land", icon: Camera },
      { time: "19:00", title: "늦은 저녁 및 야간 콘텐츠", type: "night", icon: Moon },
      { time: "23:00", title: "취침", type: "rest", icon: Bed },
    ]
  },
  {
    dayId: 2,
    date: "11.25 (화)",
    title: "발리카삭 호핑 투어",
    highlight: "한인업체(한바다호핑) 예약 예정. 인프라가 갖춰진 곳에서 편하게 다이빙!",
    events: [
      { time: "06:00", title: "기상 및 조식", type: "food", icon: Coffee },
      { time: "07:00", endTime: "13:00", title: "발리카삭 호핑 투어", type: "diving", icon: Waves },
      { time: "13:00", title: "중식", type: "food", icon: Utensils },
      { time: "14:00", endTime: "17:00", title: "자유 휴식 시간", type: "leisure", icon: Sun },
      { time: "18:00", title: "저녁 식사", type: "food", icon: Utensils },
      { time: "20:00", title: "야간 콘텐츠 즐기기", type: "night", icon: Moon },
    ]
  },
  {
    dayId: 3,
    date: "11.26 (수)",
    title: "나팔링 & 돌호비치",
    highlight: "다이빙 연습 성과 확인! 나팔링 정어리 떼와 산호 앞에서 영상 촬영.",
    events: [
      { time: "06:00", title: "기상 및 조식", type: "food", icon: Coffee },
      { time: "07:00", endTime: "13:00", title: "나팔링 정어리 & 돌호비치", type: "diving", icon: Waves },
      { time: "13:00", title: "중식", type: "food", icon: Utensils },
      { time: "14:00", endTime: "17:00", title: "자유 휴식 시간", type: "leisure", icon: Sun },
      { time: "18:00", title: "저녁 식사", type: "food", icon: Utensils },
    ]
  },
  {
    dayId: 4,
    date: "11.27 (목)",
    title: "마지막 여유 & 귀국",
    highlight: "아쉬운 마지막 여유. 오셔니카 데이유즈 혹은 다른 활동.",
    events: [
      { time: "07:00", title: "조식", type: "food", icon: Coffee },
      { time: "08:00", endTime: "12:00", title: "짐 싸기 및 체크아웃", type: "leisure", icon: Sun },
      { time: "12:00", title: "중식 (오셔니카)", type: "food", icon: Utensils },
      { time: "13:00", endTime: "18:00", title: "오셔니카 데이유즈", type: "diving", icon: Waves },
      { time: "20:00", title: "마사지 & 샤워 후 공항 이동", type: "night", icon: Plane },
      { time: "23:00", title: "귀국 비행기 탑승", type: "transport", icon: Plane },
    ]
  }
];

const getTypeStyles = (type) => {
  switch (type) {
    case 'diving': return 'bg-blue-100 border-blue-500';
    case 'land': return 'bg-green-100 border-green-500';
    case 'food': return 'bg-orange-50 border-orange-400';
    case 'rest': 
    case 'leisure': return 'bg-yellow-50 border-yellow-400';
    case 'night': return 'bg-purple-100 border-purple-500';
    case 'transport': return 'bg-gray-100 border-gray-400';
    default: return 'bg-white border-gray-300';
  }
};

const getTextColor = (type) => {
    switch (type) {
      case 'diving': return 'text-blue-700';
      case 'land': return 'text-green-700';
      case 'food': return 'text-orange-700';
      case 'rest': 
      case 'leisure': return 'text-yellow-700';
      case 'night': return 'text-purple-700';
      case 'transport': return 'text-gray-700';
      default: return 'text-gray-700';
    }
  };

// AI Modal Component
const AIAssistantModal = ({ isOpen, onClose, schedule }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'assistant', text: `안녕하세요! ${schedule.date} 일정에 대해 무엇이든 물어보세요.` }]);
    }
  }, [isOpen, schedule]);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userQuery = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setIsLoading(true);

    try {
      const scheduleContext = JSON.stringify(schedule);
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a friendly travel assistant for Bohol. Context: ${scheduleContext}. Question: ${userQuery}. Answer in Korean politely.`
            }]
          }]
        })
      });
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "오류가 발생했습니다.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    } catch (error) {
      Alert.alert("오류", "AI 연결에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white h-[80%] rounded-t-3xl overflow-hidden">
          <View className="p-4 bg-blue-600 flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <Sparkles color="#FDE047" size={20} />
              <Text className="text-white font-bold text-lg">AI 여행 비서</Text>
            </View>
            <TouchableOpacity onPress={onClose}><X color="white" size={24} /></TouchableOpacity>
          </View>
          
          <ScrollView 
            className="flex-1 p-4 bg-gray-50"
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {messages.map((msg, idx) => (
              <View key={idx} className={`flex-row mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <View className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none'}`}>
                  <Text className={`${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>{msg.text}</Text>
                </View>
              </View>
            ))}
            {isLoading && <Loader2 className="animate-spin text-blue-600 self-center" size={24} />}
          </ScrollView>

          <View className="p-4 border-t border-gray-100 flex-row items-center gap-2 pb-8">
            <TextInput 
              value={query}
              onChangeText={setQuery}
              placeholder="질문을 입력하세요..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-3"
            />
            <TouchableOpacity onPress={handleSend} className="bg-blue-600 p-3 rounded-full">
              <Send color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const currentSchedule = scheduleData.find(d => d.dayId === activeDay);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View className="bg-blue-600 p-6 pt-10 pb-8">
        <Text className="text-blue-100 text-sm font-medium mb-1">2025 프리다이빙 여행</Text>
        <Text className="text-white text-2xl font-bold mb-2">보홀 튜나의{"\n"}행복 여행 일정표</Text>
        <View className="bg-blue-700/50 self-start px-3 py-1 rounded-full flex-row items-center">
          <Plane color="white" size={14} />
          <Text className="text-white text-xs ml-2">2025.11.23 - 11.27</Text>
        </View>
      </View>

      {/* Tabs */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white border-b border-gray-100 py-3 pl-2">
            {scheduleData.map((day) => (
            <TouchableOpacity
                key={day.dayId}
                onPress={() => setActiveDay(day.dayId)}
                className={`px-5 py-2 mx-1 rounded-full ${activeDay === day.dayId ? 'bg-blue-600' : 'bg-gray-100'}`}
            >
                <Text className={`text-sm font-bold ${activeDay === day.dayId ? 'text-white' : 'text-gray-500'}`}>DAY {day.dayId}</Text>
            </TouchableOpacity>
            ))}
            <View className="w-4" /> 
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-5 pt-6">
        <View className="mb-6 flex-row items-center">
          <Text className="text-blue-600 font-bold text-lg mr-2">{currentSchedule.date}</Text>
          <Text className="text-gray-800 font-bold text-lg">{currentSchedule.title}</Text>
        </View>

        {/* Timeline */}
        <View className="pb-24">
            {/* Line */}
            <View className="absolute left-[19px] top-2 bottom-4 w-[2px] bg-gray-200" />
            
            {currentSchedule.events.map((event, index) => {
                const IconComponent = event.icon;
                return (
                <View key={index} className="flex-row mb-4 z-10">
                    <View className="w-12 pt-1 items-end mr-3">
                        <Text className="text-xs font-bold text-gray-500">{event.time}</Text>
                        {event.endTime && <Text className="text-[10px] text-gray-400">-{event.endTime}</Text>}
                    </View>
                    
                    <View className="absolute left-[15px] mt-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-400 z-20" />

                    <View className={`flex-1 p-4 rounded-xl border-l-4 ${getTypeStyles(event.type)} bg-opacity-50 shadow-sm bg-white`}>
                        <View className="flex-row justify-between items-start">
                            <View>
                                <Text className="font-bold text-base text-gray-800 mb-1">{event.title}</Text>
                                <Text className={`text-xs ${getTextColor(event.type)}`}>
                                    {event.type === 'diving' ? '🤿 프리다이빙' : event.type === 'food' ? '🍽️ 식사' : '✨ 일정'}
                                </Text>
                            </View>
                            <IconComponent size={20} color="#6B7280" />
                        </View>
                    </View>
                </View>
                );
            })}

             {/* Travel Note */}
             <View className="mt-4 bg-white p-4 rounded-2xl border border-blue-100 relative overflow-hidden mb-8">
                <View className="flex-row gap-3">
                    <View className="bg-blue-50 p-2 rounded-full w-10 h-10 items-center justify-center">
                        <Info size={20} color="#2563EB" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-gray-800 mb-1">Travel Note</Text>
                        <Text className="text-sm text-gray-600 leading-relaxed">{currentSchedule.highlight}</Text>
                    </View>
                </View>
            </View>
        </View>
      </ScrollView>

      {/* AI Button */}
      <View className="absolute bottom-8 w-full items-center">
        <TouchableOpacity 
            onPress={() => setIsAIModalOpen(true)}
            className="bg-blue-600 px-6 py-3 rounded-full shadow-lg flex-row items-center gap-2"
        >
            <Sparkles size={18} color="#FDE047" />
            <Text className="text-white font-bold">AI 여행 비서에게 물어보기</Text>
        </TouchableOpacity>
      </View>

      <AIAssistantModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} schedule={currentSchedule} />
    </SafeAreaView>
  );
}