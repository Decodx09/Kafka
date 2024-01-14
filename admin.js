const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ['192.168.1.27:9092']
});

async function init() {
    const admin = kafka.admin();

    console.log('Admin Connecting...........');
    await admin.connect();

    console.log('Admin Connected');

    console.log('Creating Topic');
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2,
        }]
    });

    console.log('Topic Created Success');

    console.log('Disconnecting ADMIN....');
    await admin.disconnect(); // Use await here
}

init();
