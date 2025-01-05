import {defineStore} from "pinia";
import { v4 as uuid } from 'uuid';

type Notification = {
    id?: string,
    type?: 'info' | 'success' | 'warning' | 'destructive'
    title: string,
    description?: string,
    duration?: number
}

export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        notifications: [] as Notification[]
    }),
    actions: {
        createNotification({type, title, description, duration}: Notification) {
            const id = uuid()
            this.notifications.push(
                { id, type, title, description, duration }
            )

            this.updateState(id, duration)
        },

        updateState(id: string, duration?: number) {
            setTimeout(() => {
                this.notifications = this.notifications.filter(notification => notification.id !== id)
            }, duration || 4000)
        }
    }
})