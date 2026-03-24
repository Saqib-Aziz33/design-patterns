// https://refactoring.guru/design-patterns/factory-method

abstract class Notification {
    abstract notify(message: string): void;
}

class EmailNotification extends Notification {
    notify(message: string): void {
        console.log(`Sending email: ${message}`);
    }
}

class SMSNotification extends Notification {
    notify(message: string): void {
        console.log(`Sending SMS: ${message}`);
    }
}

class NotificationFactory {
    static createNotification(type: string): Notification {
        switch (type) {
            case 'email':
                return new EmailNotification();
            case 'sms':
                return new SMSNotification();
            default:
                throw new Error('Unknown notification type');
        }
    }
}


(function main() {
    const emailNotification = NotificationFactory.createNotification('email');
    emailNotification.notify('mail@google.com');

    const smsNotification = NotificationFactory.createNotification('sms');
    smsNotification.notify('Hi call me when back');
})()