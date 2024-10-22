//app\front-page\checkUserSubscription.ts

export async function checkUserSubscription(userId: string): Promise<boolean> {
    if (!userId) {
        return false;
    }
    
    try {
        const response = await fetch(`/api/check-subscription?userId=${userId}`);
        const data = await response.json();
        return data.hasSubscription;
    } catch (error) {
        console.error('Failed to check subscription status:', error);
        return false;
    }
  }
  