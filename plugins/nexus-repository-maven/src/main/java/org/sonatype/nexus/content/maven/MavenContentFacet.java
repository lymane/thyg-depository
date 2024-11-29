/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
package org.sonatype.nexus.content.maven;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.sonatype.nexus.repository.Facet;
import org.sonatype.nexus.repository.content.facet.ContentFacet;
import org.sonatype.nexus.repository.maven.MavenFacet;
import org.sonatype.nexus.repository.maven.MavenPath;
import org.sonatype.nexus.repository.view.Content;
import org.sonatype.nexus.repository.view.Payload;

/**
 * Provides persistence operations for Maven.
 *
 * @since 3.25
 */
@Facet.Exposed
public interface MavenContentFacet
    extends ContentFacet, MavenFacet
{
  /**
   * Get a maven asset
   *
   * @param mavenPath Path of asset to get
   */
  Optional<Content> get(MavenPath mavenPath) throws IOException;

  /**
   * Put a maven asset
   *
   * @param path    The path of the asset to put
   * @param content The content to put
   */
  Content put(MavenPath path, Payload content) throws IOException;

  /**
   * Delete a maven asset
   *
   * @param path The path of the asset to delete.
   * @return True if asset was deleted or false if not.
   */
  boolean delete(MavenPath path) throws IOException;

  /**
   * Deletes the assets at the specified paths.
   *
   * @since 3.29
   */
  boolean delete(final List<String> paths);

  /**
   * Delete the specified maven asset and its hashes
   *
   * @param path The path of the asset to delete
   * @return The paths of the assets deleted
   */
  Set<String> deleteWithHashes(MavenPath path) throws IOException;

  /**
   * Update component attributes when {@code path} corresponds to a Maven POM
   *
   * @param path for which the corresponding component attributes may be updated
   */
  void maybeUpdateComponentAttributes(MavenPath path) throws IOException;
}
