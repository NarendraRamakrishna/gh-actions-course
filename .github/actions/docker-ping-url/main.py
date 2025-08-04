import os
import sys

if __name__ == "__main__":
    

    # Ensure the script is run with Python 3
    if sys.version_info[0] < 3:
        print("This script requires Python 3.")
        sys.exit(1)

    # Get the URL from environment variable or command line argument
    url = os.getenv("URL", None)
    if not url:
        if len(sys.argv) > 1:
            url = sys.argv[1]
        else:
            print("Please provide a URL to ping.")
            sys.exit(1)

    # Ping the URL
    ping_url(url)