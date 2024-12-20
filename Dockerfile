# Use the base image with Playwright installed
FROM mcr.microsoft.com/playwright:v1.49.0-noble

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY [ "package.json","yarn.lock", "./" ]

# Install dependencies
RUN yarn install

# Install additional dependencies required for Playwright tests
RUN yarn add -D @playwright/test
RUN yarn add -D cross-env
RUN yarn add -D playwright@latest

#FROM base as runner

# Copy the test suite files to the working directory
COPY . .

# Define an entry point script to run the tests
RUN chmod +rwx ./run_tests.sh
CMD ["./run_tests.sh"]
#ENTRYPOINT [ "tail", "-f", "/dev/null"]
