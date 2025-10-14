import AuthGuard from "@/components/auth/AuthGuard"; // 👈 문지기를 불러옵니다.

export default function CalendarPage() {
  return (
    // 👈 여기에 문지기를 배치합니다.
    <AuthGuard>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">2025년 10월</h1>
          {/* ... (이하 기존 코드와 동일) ... */}
          <div className="space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">이전달</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">다음달</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center font-semibold">
          <div className="text-red-500">일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className="text-blue-500">토</div>
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} className="h-32 bg-white border rounded-lg p-2 text-left">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}