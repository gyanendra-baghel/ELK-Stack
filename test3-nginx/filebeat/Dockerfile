FROM docker.elastic.co/beats/filebeat:8.13.4

# Set user to root so we can copy config files and set permissions
USER root

# Copy custom filebeat config
COPY filebeat.yml /usr/share/filebeat/filebeat.yml

# Copy your custom modules (important for nginx module settings)
COPY modules.d/ /usr/share/filebeat/modules.d/

# Set proper permissions
RUN chown root:root /usr/share/filebeat/filebeat.yml && \
    chmod 644 /usr/share/filebeat/filebeat.yml && \
    chown -R root:root /usr/share/filebeat/modules.d/ && \
    chmod -R 644 /usr/share/filebeat/modules.d/

# Go back to the default filebeat user (optional; remove if you need root)
# USER filebeat

# Custom entrypoint: wait for Kibana before starting Filebeat
ENTRYPOINT ["sh", "-c", "\
  echo 'Waiting for Kibana to be available...'; \
  max_retries=30; \
  count=0; \
  until curl -s http://kibana:5601/api/status | grep -q '\"level\":\"available\"' || [ $count -ge $max_retries ]; do \
    echo 'Waiting for Kibana to be available...'; \
    count=$((count + 1)); \
    sleep 10; \
  done; \
  if [ $count -ge $max_retries ]; then \
    echo 'Kibana did not become available in time. Exiting...'; \
    exit 1; \
  fi; \
  sleep 10; \
  echo 'Kibana is available. Running setup and starting Filebeat...'; \
  filebeat modules enable nginx; \
  filebeat setup -e; \
  exec filebeat -e -d \"*\"]"]
