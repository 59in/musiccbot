 module.exports = {
    name: "interactionCreate",
    async run(interaction){
        // 상호작용에서 클라이언트를 가져옵니다.
        const { client } = interaction;
        
        // 상호작용이 버튼인지 확인합니다.
        if(!interaction.isButton()) return;
        
        // 클라이언트 컬렉션에서 buttonCommands를 가져옵니다.
        const command = client.buttonCommands.get(interaction.customId);

        // 컬렉션에 명령어가 없으면 반환합니다.
        if(!command) return;

        try {
            await command.run(interaction);
        } catch(err) {
            console.error(err);
            await interaction.reply({
                content:"버튼 처리도중 알 수 없는 오류가 발생하였습니다.",
                ephemeral:true
            })
        }
    }
}