const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ['192.168.1.27:9092']
});

async function init() {
    const consumer = kafka.consumer({ groupId: "user-1" });
    await consumer.connect();
    await consumer.subscribe({ topics: ["rider-updates"] , fromBeginning : true});
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`[${topic}] : PART: ${partition} : ${message.value.toString()}`);
        }
    });

}

init();
