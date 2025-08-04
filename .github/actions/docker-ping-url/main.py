import os
import sys
import time
import requests

def ping_url(url, delay=5, max_trials=3):
    

    for trial in range(max_trials):
        try:
            response = requests.get(url, timeout=delay)
            if response.status_code == 200:
                print(f"Website {url} is reachable.")
                return True
            else:
                print(f"Website {url} returned status code {response.status_code}. Retrying...")
        except requests.RequestException as e:
            print(f"Error pinging {url}: {e}. Retrying...")

        time.sleep(delay)

    print(f"Website {url} is not reachable after {max_trials} trials.")
    return False

def run():
    # This function can be used to run the main logic of the action
    print("Running Docker Action...")
    website_url = os.getenv("INPUT_URL")
    delay = int(os.getenv("INPUT_DELAY", 5))
    max_trials = int(os.getenv("INPUT_MAX_TRIALS", 3))

    website_reachable = ping_url(website_url, delay, max_trials)
    if website_reachable:
        print(f"Website {website_url} is reachable.")

if __name__ == "__main__":
    print("Hello from Docker Action")
    run()
    
    