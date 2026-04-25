FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY . .

RUN mkdir -p config logs databases

EXPOSE 8000

CMD ["node", "pokemon-showdown", "start", "--skip-build", "--no-security"]
