FROM docker.elastic.co/beats/filebeat:8.13.4

# Set user to root so we can copy config files and set permissions
USER root

# Copy custom filebeat.yml config
COPY filebeat.yml /usr/share/filebeat/filebeat.yml

# Optional: Copy any custom modules or processors (if needed)
# COPY modules.d/ /usr/share/filebeat/modules.d/

# Set the correct permissions (important!)
RUN chown root:root /usr/share/filebeat/filebeat.yml && \
    chmod 644 /usr/share/filebeat/filebeat.yml

# Go back to the default filebeat user (optional; remove if you need root)
# USER filebeat

# Default command (optional)
# CMD ["filebeat", "-e"]
