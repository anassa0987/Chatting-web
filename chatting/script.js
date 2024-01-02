
	const sendChatBtn = document.querySelector(".chat-input span");

	const chatInput = document.querySelector(".chat-input textarea");

	const chat = document.querySelector(".chatbox");
	const chatToggler = document.querySelector(".chatbot-toggler");



	let userMessage;
	const API_KEY = "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";

	const createChatLi = (message,className)=>{

		const chatLi = document.createElement("li");
		chatLi.classList.add("chat",className);
		let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
		chatLi.innerHTML = chatContent;
		return chatLi;
		console.log(chatContent)
	}

	const genenrateResponse = (incomingChatLi) =>{
		const API_URL = "https://api.openai.com/v1/chat/completions";
		const messageElement = incomingChatLi.querySelector("p");

		const requestOption = {
			method:"POST",
			headers:{
				"Content-type":"application/json",
				"Authorization": `Bearer ${API_KEY}`

			},
			body: JSON.stringify({
				  model: "gpt-3.5-turbo",
				  messages:[{role:"user", content: userMessage}]
			})
		}
		fetch(API_URL,requestOption).then(res => res.json()).then(data =>{
			messageElement.textContent = choices[0].messages.content;
			console.log(data);
		}).catch((error)=>{
			messageElement.textContent = "You exceeded your current quota, please check your plan and billing details. Insufficient Quota";

		})
	}

	const handleChat=() =>{
		userMessage = chatInput.value.trim();
		if(!userMessage) return;

		chat.appendChild(createChatLi(userMessage,"outgoing"));

		setTimeout(()=>{
			const incomingChatLi =  createChatLi("...","incoming")
		chat.appendChild(incomingChatLi);
		genenrateResponse(incomingChatLi);

	},500);

		console.log(userMessage);
	}







	chatToggler.addEventListener("click", ()=> 
		document.body.classList.toggle("show-chatbot")
		);
	sendChatBtn.addEventListener("click", handleChat);
