import React, { useState } from 'react';
import StepNavigation from './components/StepNavigation';
import LandingPage from './components/LandingPage';
import { CURRICULUM_STEPS, HEADING_STYLE, PARAGRAPH_STYLE, CARD_STYLE, HIGHLIGHT_STYLE, BADGE_STYLE } from './constants';
import { PromptIngredients } from './components/Visualizations';
import ImagePlayground from './components/ImagePlayground';
import PromptMasterClass from './components/PromptMasterClass';
import AiBasics from './components/AiBasics';
import GemConfiguration from './components/GemConfiguration'; // Import new component
import { ArrowRight, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
const API_KEY = "REPLACE_ME_WITH_API_KEY";
export default function App() {
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [currentStepId, setCurrentStepId] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStart = () => {
    setIsLandingPage(false);
    setCurrentStepId(1);
  };

  const handleSelectStep = (id: number) => {
    setIsLandingPage(false);
    setCurrentStepId(id);
  };

  const handleGoHome = () => {
    setIsLandingPage(true);
  };

  const handleStepComplete = (id: number) => {
    if (!completedSteps.includes(id)) {
      setCompletedSteps([...completedSteps, id]);
    }
    if (id < CURRICULUM_STEPS.length) {
      setCurrentStepId(id + 1);
      // Automatically scroll to top when changing steps
      const mainElement = document.querySelector('main');
      if (mainElement) mainElement.scrollTop = 0;
    }
  };

  const currentStep = CURRICULUM_STEPS.find(s => s.id === currentStepId);

  // Render content based on step ID
  const renderStepContent = () => {
    switch (currentStepId) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AiBasics />
          </div>
        );
      case 2: // Step 2
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={CARD_STYLE}>
              <div className={BADGE_STYLE}>Technique</div>
              <h2 className={HEADING_STYLE}>완벽한 질문의 공식: RCTF</h2>
              <p className={PARAGRAPH_STYLE}>
                AI에게 원하는 대답을 듣기 위해서는 4가지 요소가 필요합니다.
                이것을 <span className={HIGHLIGHT_STYLE}>RCTF 공식</span>이라고 부릅니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-6">
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
                  <div className="text-2xl mb-2 font-black text-blue-900">R</div>
                  <h3 className="font-extrabold text-blue-800 mb-1">Role (역할)</h3>
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    AI에게 가면을 씌워주세요.<br/>"너는 20년 차 베테랑 가이드야."
                  </p>
                </div>
                <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
                   <div className="text-2xl mb-2 font-black text-purple-900">C</div>
                   <h3 className="font-extrabold text-purple-800 mb-1">Context (상황)</h3>
                   <p className="text-xs text-purple-700 font-medium leading-relaxed">
                     배경 정보를 알려주세요.<br/>"가족들과 3박 4일 도쿄 여행을 가."
                   </p>
                </div>
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                   <div className="text-2xl mb-2 font-black text-emerald-900">T</div>
                   <h3 className="font-extrabold text-emerald-800 mb-1">Task (지시)</h3>
                   <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                     무엇을 할지 명확히 하세요.<br/>"실패 없는 맛집 리스트를 짜줘."
                   </p>
                </div>
                <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all">
                   <div className="text-2xl mb-2 font-black text-orange-900">F</div>
                   <h3 className="font-extrabold text-orange-800 mb-1">Format (형식)</h3>
                   <p className="text-xs text-orange-700 font-medium leading-relaxed">
                     출력 형태를 정해주세요.<br/>"엑셀에 넣기 좋게 표로 정리해줘."
                   </p>
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-800 mb-4 mt-8 flex items-center gap-2">
                <span className="text-indigo-600">VS</span> 좋은 프롬프트와 나쁜 프롬프트
              </h3>
              
              <div className="space-y-4">
                {/* Example 1 */}
                <div className="flex flex-col md:flex-row gap-4">
                   <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 opacity-70 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="text-xs font-bold text-slate-500 uppercase">Bad Prompt</span>
                      </div>
                      <p className="text-slate-600 font-bold text-lg">"여행 계획 짜줘"</p>
                      <p className="text-xs text-red-500 mt-2 font-medium">→ 너무 막연해서 뻔한 대답만 나옵니다.</p>
                   </div>
                   <div className="hidden md:flex items-center justify-center text-slate-300">
                      <ArrowRight className="w-6 h-6" />
                   </div>
                   <div className="flex-[1.5] bg-white p-5 rounded-xl border border-indigo-100 shadow-sm ring-1 ring-indigo-50 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-bold text-indigo-600 uppercase">Good Prompt (RCTF 적용)</span>
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed text-sm">
                        "<span className="bg-blue-100 text-blue-800 px-1 rounded font-bold">R</span> 너는 베테랑 가이드야. 
                         <span className="bg-purple-100 text-purple-800 px-1 rounded font-bold ml-1">C</span> 부모님을 모시고 가는 오사카 효도 여행이야. 
                         <span className="bg-emerald-100 text-emerald-800 px-1 rounded font-bold ml-1">T</span> 걷기 편한 동선으로 일정을 짜줘. 
                         <span className="bg-orange-100 text-orange-800 px-1 rounded font-bold ml-1">F</span> 시간대별 표 형식으로."
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Prompt Master Class Tool */}
            <div className="mt-4">
              <PromptMasterClass />
            </div>
          </div>
        );
      case 3: // Step 3 - Gems (Updated)
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={CARD_STYLE}>
              <div className={BADGE_STYLE}>Advanced</div>
              <h2 className={HEADING_STYLE}>나만의 사진 비서, 젬(Gems) 구성</h2>
              <p className={PARAGRAPH_STYLE}>
                Gems는 AI에게 특정한 인격과 고정된 업무 지침을 미리 입력해두는 기능입니다. 
                매번 같은 설정을 반복할 필요가 없습니다.
              </p>
              
              {/* Replaced old content with GemConfiguration */}
              <GemConfiguration />
              
            </div>
          </div>
        );
      case 4: // Step 4 - Playground
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                 <div>
                   <div className={BADGE_STYLE}>Workshop</div>
                   <h2 className="text-3xl font-extrabold text-indigo-900">나만의 작품 만들기</h2>
                 </div>
                 <div className="hidden sm:block text-5xl">🎨</div>
              </div>
              <p className="text-slate-700 mb-8 text-lg font-medium leading-relaxed">
                지금까지 배운 내용을 바탕으로 Google Gemini에게 그림을 그려달라고 요청해봅시다.
                여러분의 상상력을 마음껏 발휘해보세요!
              </p>
              <ImagePlayground />
            </div>
          </div>
        );
      default:
        return <div>내용을 찾을 수 없습니다.</div>;
    }
  };

  if (isLandingPage) {
    return <LandingPage onStart={handleStart} onSelectStep={handleSelectStep} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="hidden md:block h-full shadow-xl z-20 relative">
        <StepNavigation 
          currentStep={currentStepId} 
          onStepChange={setCurrentStepId}
          completedSteps={completedSteps}
          onGoHome={handleGoHome}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 border-b border-slate-200 flex justify-between items-center z-10 shadow-sm">
           <button onClick={handleGoHome} className="font-bold text-indigo-600 flex items-center gap-2">
             <ArrowLeft className="w-4 h-4" /> Home
           </button>
           <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-600 border border-slate-200">
             Step {currentStepId} / {CURRICULUM_STEPS.length}
           </span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 max-w-5xl mx-auto w-full scroll-smooth">
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500 font-bold">
            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200 text-indigo-700">Step {currentStep?.id}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="text-slate-600">{currentStep?.shortDesc}</span>
          </div>
          
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="mt-16 flex justify-between items-center pt-8 border-t border-slate-200 pb-12">
            <button
              onClick={() => setCurrentStepId(prev => Math.max(1, prev - 1))}
              disabled={currentStepId === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                currentStepId === 1 
                  ? 'text-slate-300 cursor-not-allowed bg-slate-50' 
                  : 'text-slate-700 hover:bg-white hover:shadow-md hover:text-indigo-600 bg-slate-50 border border-slate-200'
              }`}
            >
              <ArrowLeft className="w-5 h-5" /> 이전 단계
            </button>

            {currentStepId < CURRICULUM_STEPS.length ? (
              <button
                onClick={() => handleStepComplete(currentStepId)}
                className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-extrabold hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
              >
                다음 단계로 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="text-indigo-600 font-bold flex items-center gap-2 bg-indigo-50 px-6 py-3 rounded-xl border border-indigo-100">
                🎉 모든 과정 완료!
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}