import React,{ useState } from "react"
function App() {
  const [colr,setColor]=useState("blue")
  return (
   <div className="w-full h-screen duration-2" style={{backgroundColor:colr}}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
             <butoon className="outline-none px-4 py-2 rounded -full shadow-lg" style={{backgroundColor:"pink"}} onClick={()=>setColor("red")}>
              Red
             </butoon>

        </div>
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
             <butoon className="outline-none px-4 py-2 rounded -full shadow-lg" style={{backgroundColor:"green"}} onClick={()=>setColor("green")}>
              Green
             </butoon>
        </div>
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
             <butoon className="outline-none px-4 py-2 rounded -full shadow-lg" style={{backgroundColor:"blue"}} onClick={()=>setColor("blue")}>
              Blue
             </butoon>
        </div>
      </div>
   </div>
  )
}

export default App
